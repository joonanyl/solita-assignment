describe("Journeys", () => {
  it("Should render and display expected content", () => {
    cy.visit("http://localhost:3000/journeys")
    cy.get("table").find("tr").should("have.length", 21)

    cy.get("input").type("linnanmäki")
    cy.get("table").find("tr").should("have.length", 3)

    cy.get("input").clear()
    cy.get("input").type("annankatu")
    cy.get("table").find("tr").should("have.length", 2)

    cy.get("table").find("tr").should("not.contain", "Töölöntulli")
    cy.get("button").contains("Next").click()
    cy.get("table").find("tr").should("have.length", 21)
    cy.get("table").find("tr").contains("Töölöntulli")
  })
})

describe("Stations", () => {
  it("Should render and display expected content", () => {
    cy.visit("http://localhost:3000/stations")

    cy.get("table").find("tr").should("have.length", 21)
    cy.get("button").contains("Create new")

    cy.get("input").type("keila")
    cy.get("table").find("tr").should("have.length", 4)

    cy.get("input").type("lahti")
    cy.get("table").find("tr").should("have.length", 2)

    cy.get("button").contains("Next").click()
    cy.get("table").find("tr").should("have.length", 21)
    cy.get("table").find("tr").contains("Sateentie")
  })
})

describe("Single station view", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/station/501")
  })

  it("Should render and display expected content", () => {
    cy.get("h1").contains("Hanasaari")
    cy.get("ul").should("have.length", 2)
  })

  it("Should filter results by month", () => {
    cy.get("p").contains("2366 journeys starting")

    cy.get("button").contains("June").click()
    cy.get("p").contains("996 journeys starting")
  })
})

describe("Navigation", () => {
  it("Should navigate to different route when clicking a navbar item", () => {
    cy.visit("http://localhost:3000/journeys")
    cy.get('a[href*="stations"]').click()
    cy.url().should("include", "/stations")
  })

  it.only("Should navigate to a station creation page when clicking a button in stations view", () => {
    cy.visit("http://localhost:3000/stations")
    cy.get("button").contains("Create new").click()

    cy.get("form").get("#id").type("123123")
    cy.get("form").get("#name").type("Testausasema")
    cy.get("form").get("#address").type("Testausranta 13")
    cy.get("form").get("#city").type("Helsinki")

    cy.get("button").contains("Create").click()
    cy.url().should("include", "/stations")
  })

  it("Should navigate to a single station view when clicking a link in table row", () => {
    cy.visit("http://localhost:3000/stations")
    cy.get("table").find("tr").contains("Tapionaukio").click()
    cy.get("h1").contains("Tapionaukio")
  })

  it("Should navigate to a different station view when clicking a link in a list", () => {
    cy.visit("http://localhost:3000/station/1")
    cy.get("ul").find("li").contains("Jätkäsaarenlaituri").click()
    cy.get("h1").contains("Jätkäsaarenlaituri")
  })
})
