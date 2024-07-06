import { expect, type Locator, type Page } from '@playwright/test'
import { UserData } from '../data/data'

export class CreatePlanPage {
  private readonly page: Page
  private readonly firstNameInput: Locator
  private readonly lastNameInput: Locator
  private readonly emailInput: Locator
  private readonly additionalInfoInput: Locator
  private readonly assistantRadioBtn: Locator
  private readonly occupationFilter: Locator
  private readonly submitBtn: Locator
  private readonly user: UserData

  constructor(page: Page, user: UserData) {
    this.page = page
    this.user = user
    this.firstNameInput = this.page.getByLabel('Förnamn')
    this.lastNameInput = this.page.getByLabel('Efternamn')
    this.emailInput = this.page.getByLabel('E-post')
    this.additionalInfoInput = this.page.getByLabel('Ytterliggare information')
    this.assistantRadioBtn = this.page.getByRole('group', {
      name: 'Använd AI Assistent?',
    })
    this.occupationFilter = this.page.getByText('Sök Yrken')
    this.submitBtn = this.page.getByRole('button', { name: 'Skapa Plan' })
  }

  async fillForm() {
    await this.firstNameInput.fill(this.user.firstName)
    await this.lastNameInput.fill(this.user.lastName)
    await this.emailInput.fill(this.user.email)
    await this.additionalInfoInput.fill(this.user.additionalInfo)
    await this.assistantRadioBtn
      .getByLabel(this.user.assistant ? 'Ja' : 'Nej')
      .click()
  }

  async pickOccupations() {
    for await (const occupation of this.user.occupations) {
      await this.occupationFilter.clear()
      await this.occupationFilter.fill(occupation.title)
      await this.page
        .locator('li')
        .filter({ hasText: occupation.title })
        .getByText('Lägg till')
        .click()

      if (occupation.education) {
        await this.page
          .locator('li')
          .filter({ hasText: occupation.title })
          .filter({ hasText: 'Ta Bort' })
          .getByLabel('Utbildning')
          .check()
      }
      if (occupation.experience) {
        await this.page
          .locator('li')
          .filter({ hasText: occupation.title })
          .filter({ hasText: 'Ta Bort' })
          .getByLabel('Erfarenhet')
          .check()
      }
    }
  }
  async SubmitForm() {
    await this.submitBtn.click()
  }
}
