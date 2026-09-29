# PAIMANA Dataset Provenance

## Source Information
- **Exact Source:** Ministry of Statistics and Programme Implementation (MoSPI) - Infrastructure and Project Monitoring Division (IPMD).
- **Source URL:** https://paimana-proj.mospi.gov.in
- **Retrieval Date:** 2026-09-28
- **Reporting Period:** February 2026
- **Dataset Completeness:** Subset (Prototype). The dataset contains 5 representative records and is **not** the complete PAIMANA database.

## Extraction Method & Limitations
- **Method:** Official MoSPI/PAIMANA public-report derived dataset. The data was gathered by extracting key values from public reports available from MoSPI.
- **Limitations:** The official PAIMANA dashboard exposes bulk downloads (CSV/XLSX) natively in the browser via client-side DOM exporting algorithms (e.g. `XLSX.writeFile` upon hitting buttons like "Download CSV" for visible datatables). Programmatic extraction of the entire 1,700+ project list directly from the API endpoint `/Home/GetTileData` is protected by anti-CSRF measures (`__RequestVerificationToken`), cookies, and authentication/CAPTCHA layers depending on the request frequency and origin. Therefore, a complete automated retrieval without bypassing security controls is unachievable programmatically from a script. This subset was assembled legitimately to serve as a prototype test bed.

## Data Lineage
**Source Values (Directly extracted without modification):**
- `projectCode`
- `projectName`
- `sector`
- `ministry`
- `state`
- `implementingAgency`
- `originalCost`
- `revisedCost`
- `expenditure`
- `originalEndDate`
- `revisedEndDate`
- `physicalProgress`
- `reportingMonth`

**Derived Values (Calculated by the ProjectShield-AI backend):**
- `costOverrunAmount`
- `costOverrunPercentage`
- `status`
- `riskScore`
- `riskLevel`
- `riskReasons`
