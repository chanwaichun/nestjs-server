class Page<T> {
  pageSize: number;
  pageNum: number;
  total: number;
  records: T;
}

export async function commonPage<T>(
  db,
  { pageNum, pageSize },
  options,
): Promise<Page<T>> {
  const pageOptions = {
    limit: Number(pageSize || 0),
    offset: Number((pageNum - 1) * pageSize),
  };
  const currentOptions = { ...pageOptions, ...options };
  const total = await db.count(currentOptions);
  const records: any = await db.findAll(currentOptions);
  return {
    pageNum: Number(pageNum),
    pageSize: Number(pageSize),
    total,
    records,
  };
}
