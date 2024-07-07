import { Locator, Page, expect } from '@playwright/test'
import { UserData } from '../data/data'

export class PlanPage {
  private readonly page: Page
  private readonly user: UserData
  private readonly name: Locator
  private readonly status: Locator

  constructor(page: Page, user: UserData) {
    this.page = page
    this.user = user
    this.name = this.page.getByRole('heading', {
      name: `${this.user.firstName} ${this.user.lastName}`,
    })
    this.status = this.page.getByText('Status: Föreslagen')
  }

  async assertProposedPlan() {
    await expect(this.name).toBeVisible({ timeout: 40000 })
    await expect(this.status).toBeVisible()
    await this.assertOccupations()
  }

  private async assertOccupations() {
    for await (const occupation of this.user.occupations) {
      const education = 'Utbildning: ' + (occupation.education ? 'Ja' : 'Nej')
      const experience = 'Erfarenhet: ' + (occupation.experience ? 'Ja' : 'Nej')
      await this.page.pause()
      await expect(
        this.page
          .getByRole('listitem')
          .filter({ hasText: occupation.title })
          .filter({
            hasText: education,
          })
          .filter({
            hasText: experience,
          })
      ).toBeVisible()
    }
  }
}
