import { test } from '@playwright/test'
import { CreatePlanPage } from './pages/createPlan'
import { userWithAssistant, userWithOutAssistant } from './data/data'
import { PlanPage } from './pages/plan'

test('Create plan with Assistant', async ({ page }) => {
  const user = userWithAssistant
  await page.goto('/')

  const createPlanPage = new CreatePlanPage(page, user)
  await createPlanPage.fillForm()
  await createPlanPage.pickOccupations()
  await createPlanPage.SubmitForm()

  const planPage = new PlanPage(page, user)
  await planPage.assertProposedPlan()
  await planPage.savePlan()
})

test('Create plan without Assistant', async ({ page }) => {
  const user = userWithOutAssistant
  await page.goto('/')

  const createPlanPage = new CreatePlanPage(page, user)
  await createPlanPage.fillForm()
  await createPlanPage.pickOccupations()
  await createPlanPage.SubmitForm()

  const planPage = new PlanPage(page, user)
  await planPage.assertProposedPlan()
  await planPage.savePlan()
})
