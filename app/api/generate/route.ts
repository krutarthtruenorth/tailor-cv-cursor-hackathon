import { NextResponse } from "next/server";
import { zodTextFormat } from "openai/helpers/zod";

import { getOpenAIClient, getOpenAIModel } from "@/lib/openai";
import { generateRequestSchema, generateResponseSchema } from "@/lib/validators";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const parsed = generateRequestSchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid request." }, { status: 400 });
    }

    const openai = getOpenAIClient();
    const response = await openai.responses.parse({
      model: getOpenAIModel(),
      input: [
        {
          role: "system",
          content:
            "You are TailorCV, an expert career strategist and resume writer. Return JSON only. Tailor the resume to the target role honestly, using only experience implied by the source resume. Improve clarity, specificity, and measurable impact. Score ATS fit from 0 to 100. Identify missing keywords that appear important in the job description but are absent or underrepresented in the resume. Produce a concise, professional cover letter.",
        },
        {
          role: "user",
          content: [
            {
              type: "input_text",
              text: `Current resume:\n${parsed.data.resume}\n\nTarget job description:\n${parsed.data.jobDescription}\n\nOutput requirements:\n- tailoredResume: plain text resume content with stronger summary and bullets\n- atsScore: integer 0-100\n- missingKeywords: concise keyword strings\n- improvedBullets: 4 to 8 upgraded resume bullets\n- coverLetter: polished and specific cover letter\nBe realistic and do not invent employers, degrees, or achievements that cannot be inferred.`,
            },
          ],
        },
      ],
      text: {
        format: zodTextFormat(generateResponseSchema, "tailorcv_response"),
      },
    });

    const data = response.output_parsed;

    if (!data) {
      return NextResponse.json({ error: "The model returned no structured output." }, { status: 502 });
    }

    return NextResponse.json(data);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected server error.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
