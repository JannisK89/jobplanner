import { test } from '@playwright/test'
import { CreatePlanPage } from './pages/createPlan'
import { userWithAssistant } from './data/data'
import { PlanPage } from './pages/plan'

test('Create plan with Assistant', async ({ page }) => {
  await page.goto('/')

  const createPlanPage = new CreatePlanPage(page, userWithAssistant)
  await createPlanPage.fillForm()
  await createPlanPage.pickOccupations()
  await createPlanPage.SubmitForm()

  const planPage = new PlanPage(page, userWithAssistant)
  await planPage.assertProposedPlan()
})
