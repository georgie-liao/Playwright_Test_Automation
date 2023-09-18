Feature: Ecommerce validation
  @validation
  Scenario Outline: Place the order
    Given Login to Ecommerce2 application with "<username>" and "<password>"
    Then Verify Error message is displayed

    Examples:
    |   username        | password   |
    |anshika@gmail.com  |Iamking@0000|
    |testwrong@gmail.com|Iamking@000 |