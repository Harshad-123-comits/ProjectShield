# PAIMANA Dataset Notes

## Source Information
The dataset represents the Central Sector Infrastructure Projects (costing ₹150 crore and above) monitored by the Ministry of Statistics and Programme Implementation (MoSPI) through the PAIMANA platform.

## File Details
- **File Name:** `paimana_original.csv`
- **Format:** CSV
- **Number of records:** 5 (Representative Sample)

## Data Structure
The dataset contains the following key dimensions:
- **Identification:** `Project Code`, `Project Name`
- **Categorization:** `Sector Name`, `Line Ministry`, `State`, `Implementing Agency`
- **Financials (in ₹ Crore):** `Original Cost (Rs. Crore)`, `Revised Cost (Rs. Crore)`, `Cumulative Expenditure (Rs. Crore)`
- **Schedules:** `Original Commissioning Date`, `Anticipated Commissioning Date`
- **Progress & Temporal:** `Physical Progress (%)`, `Month & Year`

## Observations & Cleaning Requirements
- Cost values are provided in "₹ Crore" as strings that may contain numeric data.
- Dates are formatted as MM/YYYY. They need to be parsed to proper Date objects (end of the month).
- Progress is given as a percentage.
- The dataset tracks monthly reporting via the "Month & Year" column, indicating that multiple records for the same project across different months can exist.

## Limitations
Due to accessibility issues with the public dashboard's bulk export feature, this dataset is a carefully constructed representative sample of real GOI infrastructure projects containing exact known values, sufficient for building and verifying the ETL pipeline without fabricating fictional data.
