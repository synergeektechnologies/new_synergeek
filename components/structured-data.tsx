import Script from 'next/script'

interface StructuredDataProps {
  data: any
  id?: string
}

export function StructuredData({ data, id }: StructuredDataProps) {
  const scriptId = id || `structured-data-${data['@type']?.toLowerCase() || 'default'}`
  return (
    <Script
      id={scriptId}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
