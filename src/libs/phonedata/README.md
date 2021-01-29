# 电话归属地

- 数据源 [xluohome/phonedata](https://github.com/xluohome/phonedata)

```postgresql
--- function to find phonedata
create or replace function phonedata_find(v text) returns json
as
$$
    select row_to_json(tab) as data
    from (select prefix, vendor, province, city, code
          from public.phonedata_index pi
                   left join public.phonedata_record pr on pr."offset" = pi."record_offset"
          where pi.prefix >= substr(v, 1, 7)::int
          order by pi.prefix
          limit 1) as tab;
$$ language sql;
```
