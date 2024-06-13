import knex from './knex.js'

const ScanApp = Object.freeze({
  CHECKMARX: 'CM', // Checkmarx
  SNYK: 'SN', // Snyk
  TWISTLOCK: 'TL' // Twistlock
})

const ScanType = Object.freeze({
  CVA: 'CVA', // Container Vulnerability Analysis
  SAST: 'SAST', // Static Application Security Testing
  SCA: 'SCA' // Software Composition Analysis
})

const Environment = Object.freeze({
  QA: 'QA', // QA
  PROD: 'PROD' // Production
})

async function insertRecord (scan) {
  try {
    return await knex.transaction(async (trx) => {
      const result = await trx('scan')
        .insert({
          service_code: scan.serviceCode,
          scan_app_code: scan.scanAppCode,
          scan_type_code: scan.scanTypeCode,
          environment_code: scan.environmentCode,
          critical_count: scan.criticalCount,
          high_count: scan.highCount,
          medium_count: scan.mediumCount,
          low_count: scan.lowCount,
          notes: scan.notes,
          scan_date_time: scan.scanDateTime.toISOString()
        })
        .returning('scan_id')

      return result[0].scan_id
    })
  } catch (error) {
    console.error(error)
  }
}

const scanId = await insertRecord({
  serviceCode: 'benefits-service',
  scanAppCode: ScanApp.CHECKMARX,
  scanTypeCode: ScanType.SAST,
  environmentCode: Environment.PROD,
  criticalCount: 1,
  highCount: 2,
  mediumCount: 3,
  lowCount: 4,
  scanDateTime: new Date()
})

const newRecord = await knex('scan')
  .select('*')
  .where('scan_id', scanId)
console.log(newRecord)

knex.destroy()

console.log('Done')
