```sql
-- Aashif Ahamed. Full-stack dev, Sri Lanka.
-- I run cenodigital.com and build my own stuff in between client work.

aashif=> select name, what, stack, repo from projects order by started desc;
```
```
    name    |                what                 |        stack         |  repo
------------+-------------------------------------+----------------------+---------
 devplus    | database GUI, 12 engines            | electron, react, ts  | public
 leadscout  | google maps leads + website audits  | python, playwright   | private
 bizchat    | multi-tenant RAG chatbot            | fastapi, qdrant      | private
 agencyos   | langgraph agents: lead -> proposal  | python, next.js      | public
(4 rows)
```

[**devplus**](https://github.com/aashifahd/devplus) is the one I'm putting most time into right now. I wanted a TablePlus-style client I could actually open up and change, so I wrote one. Postgres, MySQL, SQLite, SQL Server, Mongo, Redis, ClickHouse, DuckDB and a few more. GPL, installers on the [releases page](https://github.com/aashifahd/devplus/releases).

<a href="https://github.com/aashifahd/devplus"><img src="https://raw.githubusercontent.com/aashifahd/devplus/main/docs/screenshots/table.png" width="760" alt="DevPlus table view" /></a>

[**agencyos**](https://github.com/aashifahd/agencyos) started as my dissertation: can a team of small agents write a better proposal than one big prompt? It ships with the eval harness I used to compare them.

```sql
aashif=> select * from stack;
```
```
 daily     | typescript, php, python, laravel, next.js, react, tailwind
 data      | postgres, mysql, redis, qdrant
 infra     | docker, coolify, cloudflare, github actions
 sometimes | fastapi, electron, astro, payload
```

```sql
aashif=> q
-- most of my commits are in client repos you can't see. sorry, contribution graph.
```

[aashifahd.com](https://aashifahd.com) · [linkedin](https://linkedin.com/in/aashifahd) · [x](https://twitter.com/aashifahd) · hello@aashifahd.com
