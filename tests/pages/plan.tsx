import { Locator, Page, expect } from '@playwright/test'
import { UserData } from '../data/data'

export class PlanPage {
  private readonly page: Page
  private readonly user: UserData
  private readonly name: Locator
  private readonly text1: Locator
  private readonly text2: Locator
  private readonly text3: Locator
  private readonly submitBtn: Locator
  private readonly texts: string[]

  constructor(page: Page, user: UserData) {
    this.page = page
    this.user = user
    this.name = this.page.getByRole('heading', {
      name: `${this.user.firstName} ${this.user.lastName}`,
    })
    this.text1 = this.page.getByLabel(
      'Arbetsökandes Styrkor och Förbättringsmöjligheter'
    )
    this.text2 = this.page.getByLabel('Arbetmarkaden och Fokus')
    this.text3 = this.page.getByLabel('Öka chansen för jobb')
    this.submitBtn = this.page.getByRole('button', { name: 'Spara' })
    this.texts = ['Testing Text 1', 'Testing Text 2', 'Testing Text 3']
  }

  async assertProposedPlan() {
    await expect(this.name).toBeVisible({ timeout: 40000 })
    await this.assertStatus('Föreslagen')
    await this.assertOccupations()
    await this.assertTextFields()
  }

  async savePlan() {
    await this.text1.fill(this.texts[0])
    await this.text2.fill(this.texts[1])
    await this.text3.fill(this.texts[2])
    await this.submitBtn.click()
    await this.assertStatus('Aktiv')
    await this.assertTexts()
  }

  private async assertOccupations() {
    for await (const occupation of this.user.occupations) {
      const education = 'Utbildning: ' + (occupation.education ? 'Ja' : 'Nej')
      const experience = 'Erfarenhet: ' + (occupation.experience ? 'Ja' : 'Nej')
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

  private async assertStatus(status: 'Föreslagen' | 'Aktiv') {
    await expect(this.page.getByText(`Status: ${status}`)).toBeVisible()
  }

  private async assertTextFields() {
    if (this.user.assistant) {
      const text1Value = await this.text1.inputValue()
      const text2Value = await this.text2.inputValue()
      const text3Value = await this.text3.inputValue()

      expect(text1Value.length).toBeGreaterThan(0)
      expect(text2Value.length).toBeGreaterThan(0)
      expect(text3Value.length).toBeGreaterThan(0)
    } else {
      const text1Value = await this.text1.inputValue()
      const text2Value = await this.text2.inputValue()
      const text3Value = await this.text3.inputValue()

      expect(text1Value.length).toBeLessThanOrEqual(0)
      expect(text2Value.length).toBeLessThanOrEqual(0)
      expect(text3Value.length).toBeLessThanOrEqual(0)
    }
  }
  private async assertTexts() {
    await expect(this.page.getByText(this.texts[0])).toBeVisible()
    await expect(this.page.getByText(this.texts[1])).toBeVisible()
    await expect(this.page.getByText(this.texts[2])).toBeVisible()
  }
}
