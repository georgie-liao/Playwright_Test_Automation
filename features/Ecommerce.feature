Feature: Ecommerce validation
  @Regression
  Scenario: Place the order
    Given Login to Ecommerce application with "anshika@gmail.com" and "Iamking@000"
    When Add "iphone 13 pro" to cart
    Then Verify "iphone 13 pro" is displayed in the cart
    When Enter valid details and place the order
    Then Verify order is present in the order history