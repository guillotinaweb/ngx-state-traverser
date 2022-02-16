# 1.5.3 (2022-02-16)

## Improvement

-   Upgrade to Angular 13 [jpittman]

# 1.5.3 (2021-05-21)

## Bug fix

-   Fix tslib version [ebrehault]

# 1.5.2 (2021-05-21)

## Improvement

-   Upgrade to Angular 12 [ebrehault]

# 1.5.1 (2021-01-07)

## Bug fix

-   Do not break NgRX immutability rules [ebrehault]

# 1.5.0 (2021-01-06)

## Improvement

-   Upgrade to Angular 11 [ebrehault]
-   Use GitHub Actions [ebrehault]

# 1.4.0 (2020-09-09)

## Improvement

-   Action to trigger traversing navigation [ebrehault]

# 1.3.0 (2020-07-06)

## New feature

-   `StateResolver` decorator to enable state-first mode on any resolver [ebrehault]

## Improvement

-   Rename TraversingState in TraverserState [ebrehault]
-   AddOrUpdateTraverserResources action [ebrehault]

# 1.2.6 (2020-06-29)

## Improvement

-   Upgrade to Angular 10 [ebrehault]

# 1.2.5 (2020-06-18)

## Improvement

-   Add getView selector [ebrehault]

## Bug fix

-   Clean up implicit any [ebrehault]

# 1.2.4 (2020-06-08)

-   No implicit return

# 1.2.3 (2020-06-07)

-   Fix context path matching on resource update

# 1.2.2 (2020-05-24)

-   Upgrade to Angular 9.1
-   Fix context update on resource update

# 1.2.1 (2020-03-27)

## Improvement

-   Allow to empty a tile (require angular-traversal 1.5.1 or higher) [mathilde-pellerin]

# 1.2.0 (2020-02-24)

-   Upgrade to Angular 9

# 1.1.1 (2020-02-05)

-   Allow to select children
-   Allow to resolve several contexts at once

# 1.1.0 (2020-01-28)

-   Tile support

# 1.0.6 (2019-11-02)

-   Add Travis and fix demo and test setup

# 1.0.5 (2019-10-20)

-   Allow to get ancestors with relative path

# 1.0.4 (2019-10-03)

-   Don't overwrite full object on Update

# 1.0.3 (2019-09-30)

-   Prevent pending contexts to be sent by TraverseTo selector

# 1.0.2 (2019-09-30)

-   Add pending in state to prevent infinite loop when getting ancestors

# 1.0.1 (2019-09-26)

-   Add getAncestors selector

# 1.0.0 (2019-09-04)

-   Initial version
