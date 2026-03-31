import { BetaAnalyticsDataClient } from '@google-analytics/data'

const analyticsDataClient = new BetaAnalyticsDataClient({
    credentials: {
          client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
          private_key: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
})

export default async function handler(req, res) {
    if (req.method !== 'GET') {
          return res.status(405).json({ error: 'Method not allowed' })
    }

  try {
        const propertyId = process.env.GOOGLE_ANALYTICS_PROPERTY_ID
        const startDate = new Date()
        startDate.setDate(startDate.getDate() - 7)
        const dateRange = {
                startDate: startDate.toISOString().split('T')[0],
                endDate: new Date().toISOString().split('T')[0],
        }

      // Get total users and events
      const [response] = await analyticsDataClient.runReport({
              property: `properties/${propertyId}`,
              dateRanges: [dateRange],
              metrics: [
                { name: 'activeUsers' },
                { name: 'eventCount' },
                { name: 'newUsers' },
                      ],
      })

      // Get top pages
      const [pageResponse] = await analyticsDataClient.runReport({
              property: `properties/${propertyId}`,
              dateRanges: [dateRange],
              dimensions: [{ name: 'pageTitle' }, { name: 'pagePath' }],
              metrics: [{ name: 'screenPageViews' }],
              orderBys: [{ metric: { metricName: 'screenPageViews' }, descending: true }],
              limit: 5,
      }).catch(() => [[{ rows: [] }]])

      // Get top events
      const [eventResponse] = await analyticsDataClient.runReport({
              property: `properties/${propertyId}`,
              dateRanges: [dateRange],
              dimensions: [{ name: 'eventName' }],
              metrics: [{ name: 'eventCount' }],
              orderBys: [{ metric: { metricName: 'eventCount' }, descending: true }],
              limit: 5,
      }).catch(() => [[{ rows: [] }]])

      const totalUsers = response.rows?.[0]?.metricValues?.[0]?.value || '0'
        const totalEvents = response.rows?.[0]?.metricValues?.[1]?.value || '0'
        const topPages = pageResponse.rows || []
              const topEvents = eventResponse.rows || []

                    // Count conversions (form_submit, generate_lead, quote_request events)
                    const conversionEvents = ['form_submit', 'generate_lead', 'quote_request']
        const conversions = topEvents
          .filter(row => conversionEvents.includes(row.dimensionValues?.[0]?.value))
          .reduce((sum, row) => sum + parseInt(row.metricValues?.[0]?.value || 0), 0)

      res.status(200).json({
              totalUsers,
              totalEvents,
              activeUsers: response.rows?.[0]?.metricValues?.[0]?.value || '0',
              conversions,
              topPages: topPages.map(row => ({
                        pageTitle: row.dimensionValues?.[0]?.value || '',
                        pagePath: row.dimensionValues?.[1]?.value || '',
                        screenPageViews: row.metricValues?.[0]?.value || '0',
              })),
              topEvents: topEvents.map(row => ({
                        eventName: row.dimensionValues?.[0]?.value || '',
                        eventCount: row.metricValues?.[0]?.value || '0',
              })),
              timestamp: new Date().toISOString(),
      })
  } catch (error) {
        console.error('GA4 API Error:', error)
        res.status(500).json({
                error: 'Failed to fetch analytics data',
                message: error.message,
              totalUsers: 0,
                totalEvents: 0,
                activeUsers: 0,
                conversions: 0,
                topPages: [],
                topEvents: [],
                timestamp: new Date().toISOString(),
        })
  }
}
