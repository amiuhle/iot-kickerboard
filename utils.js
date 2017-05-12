/**
 * Helper function to execute and return a knex query,
 * logging query and result to the console.
 */
export async function debugAndExecute (query) {
  console.log(`\n\nQuery: ${query.toString()}\nResult:`)

  const result = await query

  console.table(result)
  console.log('')

  return result
}
