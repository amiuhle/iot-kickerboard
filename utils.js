/**
 * Helper function to execute and return a knex query,
 * logging query and result to the console.
 */
export async function debugAndExecute (query, showResult = true) {
  console.log(`\n\nQuery: ${query.toString()}`)

  const result = await query

  if (showResult) {
    console.log('\nResult:')
    console.table(result)
  }
  console.log('')

  return result
}

export function computePoints (shooter, target, actualHit) {
  let points = 0

  if (actualHit === target) {
    points = 1
  } else if (actualHit === shooter) {
    points = -1
  } else if (actualHit === null) {
    points = null
  }

  return points
}
