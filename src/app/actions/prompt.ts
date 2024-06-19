import aiModel from '../lib/aiModel'

export default async function getAiPlan() {
  const prompt = `You are a job guidance councellor and you are creating a plan for a person on how to get a job as quickly as possible. Keep it Professional.

The person wants to work with the following and has education and work experience as stated:
  Front End Developer - Education: Yes - Work Experience - Yes
  DevOps Engineer - Education: No - Work Experience - Yes
  Scrum Master - Education: No - Work Experience - No
  `
  const result = await aiModel.generateContent(prompt)
  return result.response.text()
}
