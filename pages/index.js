import { useState, useEffect } from 'react'
import Head from 'next/head'
import styles from '../styles/index.module.css'

export default function Home() {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

  useEffect(() => {
        async function fetchGAData() {
                try {
                          const response = await fetch('/api/ga4-data')
                          if (!response.ok) throw new Error('Failed to fetch GA4 data')
                          const result = await response.json()
                          setData(result)
                } catch (err) {
                          setError(err.message)
                } finally {
                          setLoading(false)
                }
        }

                fetchGAData()
        // Refresh data every 30 seconds
                const interval = setInterval(fetchGAData, 30000)
        return () => clearInterval(interval)
  }, [])

  return (
        <div className={styles.container}>
      <Head>
            <title>Clintar Dashboard</title>
          <meta name="description" content="Real-time GA4 Analytics Dashboard" />
            <link rel="icon" href="/favicon.ico" />
    </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Clintar Analytics Dashboard</h1>

  {loading && <p className={styles.loading}>Loading real-time data...</p>}
   {error && <p className={styles.error}>Error: {error}</p>}

    {data && (
                <div className={styles.grid}>
                  <div className={styles.card}>
                    <h2>Total Users</h2>
                   <p className={styles.value}>{data.totalUsers || 0}</p>
      </div>

               <div className={styles.card}>
                    <h2>Total Events</h2>
                    <p className={styles.value}>{data.totalEvents || 0}</p>
    </div>

              <div className={styles.card}>
                   <h2>Active Users (30 min)</h2>
                   <p className={styles.value}>{data.activeUsers || 0}</p>
    </div>

            <div className={styles.card}>
                  <h2>Conversions</h2>
                <p className={styles.value}>{data.conversions || 0}</p>
     </div>

   {data.topPages && (
                   <div className={`${styles.card} ${styles.fullWidth}`}>
                      <h2>Top Pages</h2>
                      <table className={styles.table}>
                       <thead>
                         <tr>
                           <th>Page</th>
                         <th>Views</th>
     </tr>
     </thead>
                    <tbody>
                                                {data.topPages.map((page, idx) => (
                           <tr key={idx}>
                              <td>{page.pagePath || page.pageTitle || 'N/A'}</td>
                              <td>{page.screenPageViews || page.eventCount || 0}</td>
      </tr>
                        ))}
                                                  </tbody>
     </table>
     </div>
                 )}

   {data.topEvents && (
                    <div className={`${styles.card} ${styles.fullWidth}`}>
                     <h2>Top Events</h2>
                    <table className={styles.table}>
                      <thead>
                         <tr>
                          <th>Event</th>
                            <th>Count</th>
     </tr>
     </thead>
                  <tbody>
   {data.topEvents.map((event, idx) => (
                           <tr key={idx}>
                             <td>{event.eventName || 'N/A'}</td>
                            <td>{event.eventCount || 0}</td>
     </tr>
                         ))}
     </tbody>
</table>
     </div>
                 )}
     </div>
             )}

        <p className={styles.updated}>
                Last updated: {data?.timestamp ? new Date(data.timestamp).toLocaleTimeString() : 'N/A'}
      </p>
     </main>
      </div>
      )
      }
