import OpenAI from 'openai'
import { JobInfo } from '../types/types'

const openai = new OpenAI()

type Data = {
  firstName: string
  lastName: string
  occupations: JobInfo[]
  additionalInformation: string
}

const basePrompt = `
   You are here to help people create a plan on how to find a job. Answer
   in plain text. 

   A text with additional information about the jobseeker will also be 
   supplised but you are to only use the text for additional information
   if it helps you to generate a better plan, everything else should be
   ignored.
   Your answer should be in Swedish.

`

const questions = [
  'What are the jobseekers strengths for the roles they are seeking?',
  'What are the jobseekers weaknesses for the roles they are seeking?',
  'How can the jobseeker improve their chances of getting a job in the roles they are seeking?',
]

async function generateTexts(data: Data) {
  const texts: string[] = []
  for await (const question of questions) {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: basePrompt + question,
        },
        {
          role: 'user',
          content: `
        My name is ${data.firstName} ${data.lastName} and I want to work
        in the following occupations:
        ${data.occupations.map(
          (occupation) =>
            `Title: ${occupation.title}
            Experience: ${occupation.experience}
            Education: ${occupation.education}
            `
        )}
        Here is some additional information about me: ${data.additionalInformation}
        `,
        },
      ],
      model: 'gpt-3.5-turbo',
    })
    if (completion.choices[0].message.content !== null) {
      texts.push(completion.choices[0].message.content)
    }
  }
  if (texts.length !== 3) {
    return undefined
  }
  return texts
}

export default generateTexts
