Feature: user sign in to portal
@bbhub
  Scenario Outline: user sign in with valide credentital
    Given sign in to BBHub with "<username>" and "<password>"
    Then user should sign in successfully

    Examples:
    |username| password|
    |George  |qqnbbn00 |
