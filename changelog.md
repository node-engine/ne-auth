# ne-auth changelog

## Change Tags

Bug
- BF Bug fix: Fixed a bug

Optimisation
- OO Optimisation: The internal workings of the module is improved 
- OR Refactor: The internal code is refactored

Change
- CI Input change: What is required as input for the module is changed
- CO Output change: What is output by the module is changed

Dependencies
- DN New Dependency: A new dependency is added to the package
- DR Remove Dependency: A  dependency is removed from the package
- DU Update Dependency: A dependency is updated in the package


# 1.4.3

Release date: 20151021 

Remove 1.4.0
- Caused too many bugs


# 1.4.2

Release date: 20151021 

(BF)
Fixed bugs caused by 1.4.0


# 1.4.1

Release date: 20151021

(BF)
Fixed bugs caused by 1.4.0

# 1.4.0

Release date: 20151020

All require statements (BF DN)
- When using ne-auto the require statements did not find the module
- Are now conditional to be compatible with ne-auto
- If there is a process.env.NE_AUTO then the require statements use the ne-auto if not then they require from root
- Now this module will work with ne-auto and without ne-auto
- DN tag because this is connected to dependencies 