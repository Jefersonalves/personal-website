---
title: Resume
toc: true
---

# Resume Timeline

```js
const civilizations = FileAttachment("data/resume_timeline.csv").csv({typed: true})
```

```js
Plot.plot({
  width,
  height: 600,
  marginLeft: 0,
  marginRight: 200,
  // marginBottom: 200,
  axis: null,
  color: {
    // scheme: "BuRd",
    scheme: "PuOr",
    legend: true,
  },
  x: {
    axis: "top",
    grid: true,
    // tickFormat: (x) => x < 0 ? `${-x} BC` : `${x} AD`
  },
  marks: [
    Plot.barX(civilizations, {
      x1: "start",
      x2: "end",
      y: (d) => d.company + d.role,
      sort: {y: "-x1"},
      fill: "category",
      // stroke: "category",
      // strokeWidth: 2,
      // fillOpacity: 0.5,
      // interval: 1,
      // inset: 0.5,
      // dy: -10,
      // fy: "category",
      insetTop: 2,
      insetBottom: 2
    }),
    Plot.text(civilizations, {
      x: "start",
      y: (d) => d.company + d.role,
      text: (d) => d.company + ": " + d.role,
      // stroke: "white",
      // strokeWidth: 0.1,
      textAnchor: "start",
      dx: 3,
      // fy: "category",
    })
  ]
})
```

# Experience

### SENIOR DATA ENGINEER (Bitboundaire - Brazil)
* Implemented data quality routines
* Developed data pipelines to enrich data with ArgoCD, and AWS EMR (Soark)

### SENIOR DATA ENGINEER (Five Acts - Brazil)
* Refactored and optimized Databricks ETL pipelines for terabyte scale datasets, reducing cluster
costs by 60% while improving reliability and scalability in a production.
* Optimized the Spark script that calculates model monitoring metrics by redesigning execution
plans and restructuring input datasets, cutting processing time from 3 hours to just 30 seconds.
* Implemented a centralized Feature Store in Databricks by refactoring and optimizing feature
computation pipelines, accelerating model development cycles and improving code reuse
across teams.
* Collaborated with data scientists to develop a credit scoring model in Databricks that
outperformed pre-existing models by 6% in the Kolmogorov–Smirnov score, enabling
improvements in credit policies.

### DATA ENGINEER CONSULTANT (DeltaAi - Brazil)
* Architected and implemented a Data Lakehouse to integrate legal data sources using the
Medallion architecture and Data Vault modeling.
* Designed and implemented event-driven ingestion workflows, improving data freshness and
reducing latency for downstream analytics.
* Developed generative AI pipelines with Databricks, Spark, LangChain, and MLflow to automate
large-scale extraction of structured data from legal documents, enhancing downstream
litigation forecasting.

### SENIOR DATA ENGINEER (VLG Investimentos - Brazil)
* Led the development of a Data Lakehouse leveraging Databricks and AWS with the Medallion
Architecture, consolidating financial datasets to provide a foundation for advanced analytics
and predictive modeling.
* Led the end-to-end development of an automated asset allocation tool, enabling scalable
portfolio management for clients and reducing human workload by automating routine
allocation decisions.

### DATA ENGINEER (VLG Investimentos - Brazil)
* Implemented a modern data stack on AWS leveraging Airflow, DBT, PostgreSQL and Metabase,
automating data pipelines and delivering KPI reports that improved executive decision-making.
* Developed a ranking system for financial advisors based on commercial performance using
SQL and DBT, enabling data-driven decision-making aligned with company strategies.

### DATA SCIENTIST (IBPAD - Brazil)
* Built NLP solutions using Scikit-learn, spaCy, and NetworkX for entity detection and clustering,
and delivered visualizations host

# Education
* 2014 - 2019: SOFTWARE ENGINEERING - BS Universidade de Brasília (UnB)
* 2017 - 2018: UNDERGRADUATE RESEARCH PROGRAM (PROIC) UnB
* 2009 - 2010: JUNIOR UNDERGRADUATE RESEARCH PROGRAM (PIC) Universidade Federal de Goiás (UFG)

# Certifications
* Aug 2025: DATABRICKS CERTIFIED GENERATIVE AI ENGINEER ASSOCIATE Databricks
* Feb 2025: DATABRICKS CERTIFIED DATA ENGINEER PROFESSIONAL Databricks
* Oct 2024: DATABRICKS CERTIFIED DATA ENGINEER ASSOCIATE Databricks
* Apr 2024: DATABRICKS FUNDAMENTALS Databricks
* Feb 2024: ASTRONOMER CERTIFICATION FOR APACHE AIRFLOW FUNDAMENTALS Astronomer
