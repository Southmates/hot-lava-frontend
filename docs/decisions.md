# Architectural Decisions

## CMS does not manage llm.txt

Reason:
- Infrastructure-level metadata
- Rarely changes
- Risky if edited incorrectly

## Section titles are not centralized

Reason:
- Titles belong to content domains
- Avoids artificial coupling
