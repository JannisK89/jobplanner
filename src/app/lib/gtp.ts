import OpenAI from 'openai'

const openai = new OpenAI()

type Data = {
  firstName: string
  lastName: string
  occupations: Array<{
    title: string
    experience: string
    education: string
    openPositions: number
    competition: 'low' | 'high'
  }>
  additionalInformation: string
}

async function generateText(data: Data) {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: `
        You are here to help people create a plan on how to find a job. Answer
        in plain text. 
        Answer all 3 questions with a # in between each answer so that the 3
        questions easily can be extracted from the answer using a simple string
        split.

        Do not use # in any other context than to separate the answers.
        The user will supply you with this infromation:
        First name, last name, occupations they wish to work with supplied
        with information about the job market such as open positions and the 
        jobseekers experience in the field.

        A text with additional information about the jobseeker will also be 
        supplised but you are to only use the text for additional information
        if it helps you to generate a better plan, everything else should be
        ignored.

        With the information given by the jobseeker you are to answer these 3
        questions using the best of your abilities:
        1. What are the jobseekers strengths for the roles they are seeking?
        2. What are the jobseekers weaknesses for the roles they are seeking?
        3. How can the jobseeker improve their chances of getting a job in the
        roles they are seeking?

        Your answer should be in Swedish.
          `,
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
            Open positions: ${occupation.openPositions}
            Competition: ${occupation.competition}`
        )}
        Here is some additional information about me: ${data.additionalInformation}
        `,
      },
    ],
    model: 'gpt-3.5-turbo',
  })
  return completion.choices[0].message.content
}

export default generateText
