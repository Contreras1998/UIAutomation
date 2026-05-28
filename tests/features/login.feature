Feature: Sauce Demo Login
  In order to access the inventory
  As a user
  I want to authenticate via the login page

  @happy
  Scenario: Successful login
    Given the user is on the login page
    When they login with username "standard_user" and password "secret_sauce"
    Then they should land on the inventory page

  @negative
  Scenario: Locked out user sees explicit error
    Given the user is on the login page
    When they login with username "locked_out_user" and password "secret_sauce"
    Then they should see a locked out error

  @negative
  Scenario: Invalid credentials show error
    Given the user is on the login page
    When they login with username "standard_user" and password "wrong_pass"
    Then they should see an authentication error

  @validation
  Scenario: Empty username
    Given the user is on the login page
    When they login with username "" and password "secret_sauce"
    Then they should see a username required error

  @validation
  Scenario: Empty password
    Given the user is on the login page
    When they login with username "standard_user" and password ""
    Then they should see a password required error

  @security
  Scenario: SQL injection attempt in username
    Given the user is on the login page
    When they login with username "' OR '1'='1' --" and password "x"
    Then the application should reject the input safely

  @security
  Scenario: XSS attempt in username
    Given the user is on the login page
    When they login with username "<script>alert(1)</script>" and password "x"
    Then the UI should not execute scripts

  @edge
  Scenario: Extremely long input
    Given the user is on the login page
    When they login with username "<LONG_10K>" and password "<LONG_10K>"
    Then the application should handle the input without crashing

  @edge
  Scenario: Unicode and emoji inputs
    Given the user is on the login page
    When they login with username "テスト😀🚀" and password "secret_sauce"
    Then the application should handle unicode inputs consistently

  @edge
  Scenario: Leading and trailing whitespace
    Given the user is on the login page
    When they login with username " standard_user " and password "secret_sauce"
    Then the application should trim or reject inputs consistently

  @manual
  Scenario: Rapid repeated failed attempts (rate-limiting)
    Given the system is in a clean state
    When a script submits invalid credentials rapidly 20 times
    Then the application should apply rate-limiting or progressive delays

  @accessibility
  Scenario: Keyboard navigation and aria
    Given the user is on the login page
    When they tab through the form and submit with Enter
    Then the form should be operable via keyboard and error messages announced
