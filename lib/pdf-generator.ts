import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

export async function generateDealNotePDF(companyName: string) {
  try {
    // Get the main content container
    const element = document.querySelector('[data-pdf-content]') as HTMLElement
    if (!element) {
      throw new Error('Content not found for PDF generation')
    }

    // Create canvas from the element
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: false,
      backgroundColor: '#ffffff',
      width: element.scrollWidth,
      height: element.scrollHeight,
    })

    // Calculate dimensions
    const imgData = canvas.toDataURL('image/png')
    const pdf = new jsPDF('p', 'mm', 'a4')

    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = pdf.internal.pageSize.getHeight()
    const canvasWidth = canvas.width
    const canvasHeight = canvas.height

    // Calculate scaling to fit page width
    const scale = pdfWidth / (canvasWidth * 0.264583) // Convert px to mm
    const scaledHeight = (canvasHeight * 0.264583) * scale

    let yPosition = 0
    let pageHeight = pdfHeight - 20 // Leave margins

    // Add content page by page if it exceeds one page
    while (yPosition < scaledHeight) {
      // Add new page if not the first page
      if (yPosition > 0) {
        pdf.addPage()
      }

      // Calculate the portion of image to add to this page
      const sourceY = yPosition / scale / 0.264583
      const sourceHeight = Math.min(pageHeight / scale / 0.264583, canvasHeight - sourceY)

      // Create a temporary canvas for this page portion
      const pageCanvas = document.createElement('canvas')
      const pageCtx = pageCanvas.getContext('2d')!
      pageCanvas.width = canvasWidth
      pageCanvas.height = sourceHeight

      // Fill with white background
      pageCtx.fillStyle = '#ffffff'
      pageCtx.fillRect(0, 0, canvasWidth, sourceHeight)

      // Draw the portion of the main canvas
      pageCtx.drawImage(
        canvas,
        0, sourceY, canvasWidth, sourceHeight,
        0, 0, canvasWidth, sourceHeight
      )

      const pageImgData = pageCanvas.toDataURL('image/png')
      pdf.addImage(pageImgData, 'PNG', 10, 10, pdfWidth - 20, sourceHeight * scale)

      yPosition += pageHeight
    }

    // Save the PDF
    const fileName = `${companyName.replace(/[^a-zA-Z0-9]/g, '_')}_Deal_Note.pdf`
    pdf.save(fileName)

    return { success: true, fileName }
  } catch (error) {
    console.error('Error generating PDF:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}

export async function generateQuickDealNotePDF(companyData: any) {
  try {
    const pdf = new jsPDF('p', 'mm', 'a4')
  const pageWidth = pdf.internal.pageSize.getWidth()
  const pageHeight = pdf.internal.pageSize.getHeight()
  // Start below the header with a comfortable gap
  let yPosition = 40

    // Helper function to add new page if needed
    const checkPageBreak = (requiredSpace: number) => {
      if (yPosition + requiredSpace > pageHeight - 20) {
        pdf.addPage()
        yPosition = 30
      }
    }

    // Header with company name and logo placeholder
    pdf.setFillColor(59, 130, 246) // Blue background
    pdf.rect(0, 0, pageWidth, 25, 'F')
    pdf.setTextColor(255, 255, 255)
    pdf.setFontSize(18)
    pdf.text(`Investment Deal Note`, 20, 15)
    pdf.setFontSize(14)
    pdf.text(`${companyData.name}`, pageWidth - 20, 15, { align: 'right' })

    // Reset text color
    pdf.setTextColor(0, 0, 0)

    // Executive Summary Section
    checkPageBreak(40)
    pdf.setFontSize(16)
    pdf.setFont('helvetica', 'bold')
    pdf.text('Executive Summary', 20, yPosition)
    yPosition += 10

    pdf.setFontSize(10)
    pdf.setFont('helvetica', 'normal')
    const summaryText = `${companyData.name} is a ${companyData.sector.toLowerCase()} company founded in ${companyData.founded}, currently in the ${companyData.stage.toLowerCase()} stage. The company has demonstrated ${companyData.trend === 'up' ? 'strong growth momentum' : 'mixed performance'} with current revenue of ${companyData.arr}. Our AI analysis gives this investment a score of ${companyData.aiScore}/10, indicating a ${companyData.aiScore >= 7 ? 'strong' : companyData.aiScore >= 5 ? 'moderate' : 'high-risk'} investment opportunity.`

    const summaryLines = pdf.splitTextToSize(summaryText, pageWidth - 40)
    pdf.text(summaryLines, 20, yPosition)
    yPosition += summaryLines.length * 5 + 10

  // Company Overview Section (table)
    checkPageBreak(80)
  // Section heading (use primary color)
  pdf.setTextColor(59, 130, 246)
  pdf.setFontSize(14)
  pdf.setFont('helvetica', 'bold')
  pdf.text('Company Overview', 20, yPosition)
  pdf.setTextColor(0, 0, 0)
  yPosition += 10

    // Company details as a two-column bordered table
    pdf.setFontSize(10)
    pdf.setFont('helvetica', 'normal')

    const companyDetails = [
      ['Sector', companyData.sector],
      ['Current Revenue', companyData.arr],
      ['Funding Stage', companyData.stage],
      ['Founded', companyData.founded],
      ['Team Size', companyData.employees],
      ['Location', companyData.location],
      ['Last Analysis', companyData.analyzed]
    ]

  const tableX = 20
  const tableWidth = pageWidth - 40
  const labelColW = 60
  const overviewRowH = 8
  const tableH = companyDetails.length * overviewRowH

    // Outer border
    pdf.setDrawColor(128, 128, 128)
    pdf.rect(tableX, yPosition, tableWidth, tableH, 'S')

    // Horizontal separators and cell text
    companyDetails.forEach((row, i) => {
      const rowY = yPosition + i * overviewRowH
      // draw horizontal line (except first top border)
      pdf.line(tableX, rowY, tableX + tableWidth, rowY)
      pdf.setFont('helvetica', 'bold')
      pdf.text(String(row[0]) + ':', tableX + 4, rowY + 6)
      pdf.setFont('helvetica', 'normal')
      pdf.text(String(row[1]), tableX + labelColW + 8, rowY + 6)
    })
    // bottom border line
  pdf.line(tableX, yPosition + tableH, tableX + tableWidth, yPosition + tableH)
  yPosition += tableH + 8

    // Description
    pdf.setFont('helvetica', 'bold')
    pdf.text('Description', 20, yPosition)
    yPosition += 7
    pdf.setFont('helvetica', 'normal')
    const descLines = pdf.splitTextToSize(companyData.description, pageWidth - 40)
    pdf.text(descLines, 20, yPosition)
    yPosition += descLines.length * 5 + 12

  // Financial Metrics Section
  checkPageBreak(80)
  pdf.setTextColor(59, 130, 246)
  pdf.setFontSize(14)
  pdf.setFont('helvetica', 'bold')
  pdf.text('Key Performance Metrics', 20, yPosition)
  pdf.setTextColor(0, 0, 0)
  yPosition += 12

      // Create a table for metrics (with borders) - improved column sizing and zebra rows
      pdf.setFontSize(10)
      const metrics = [
        ['Metric', 'Value', 'Industry Benchmark', 'Performance'],
        ['ARR Growth', '240% YoY', '180% YoY', 'Above'],
        ['CAC Payback Period', '8 months', '12 months', 'Superior'],
        ['Gross Margin', '85%', '75%', 'Above'],
        ['Burn Multiple', '1.2x', '2.1x', 'Superior'],
        ['Net Promoter Score', '72', '50', 'Above'],
        ['Customer Retention', '94%', '85%', 'Above']
      ]

      const metricsX = 20
      const metricsW = pageWidth - 40
      const headerH = 9
      const rowH = 10
      const rows = metrics.length - 1
      const metricsTableH = headerH + rows * rowH

      // Column widths
      const col1W = Math.round(metricsW * 0.45) // Metric
      const col2W = Math.round(metricsW * 0.18) // Value
      const col3W = Math.round(metricsW * 0.22) // Benchmark
      const col4W = metricsW - (col1W + col2W + col3W) // Status

      // Draw outer border and header background
      pdf.setDrawColor(200, 200, 200)
      pdf.rect(metricsX, yPosition - 6, metricsW, metricsTableH + 2, 'S')
      pdf.setFillColor(245, 245, 245)
      pdf.rect(metricsX, yPosition - 6, metricsW, headerH, 'F')

      // Header labels (primary color)
      pdf.setFont('helvetica', 'bold')
      pdf.setTextColor(59, 130, 246)
      pdf.text('Metric', metricsX + 5, yPosition)
      pdf.text('Value', metricsX + col1W + 8, yPosition)
      pdf.text('Benchmark', metricsX + col1W + col2W + 12, yPosition)
      pdf.text('Status', metricsX + col1W + col2W + col3W + 10, yPosition)
      pdf.setTextColor(0, 0, 0)
      yPosition += headerH + 2

      // Rows with zebra striping and separators — compute row heights to fit wrapped text
      let metricsCursorY = yPosition
      metrics.slice(1).forEach((r, idx) => {
        const [metric, value, benchmark, performance] = r

        // compute wrapped lines for each cell
        const metricLines = pdf.splitTextToSize(String(metric), col1W - 10)
        const valueLines = pdf.splitTextToSize(String(value), col2W - 8)
        const benchmarkLines = pdf.splitTextToSize(String(benchmark), col3W - 8)
        const statusLines = pdf.splitTextToSize(String(performance), col4W - 10)

        // determine row height (line count * approx line height)
        const lineHeight = 5
        const cellLines = Math.max(metricLines.length, valueLines.length, benchmarkLines.length, statusLines.length)
        const thisRowH = Math.max(rowH, cellLines * lineHeight + 6)

        // zebra background
        if (idx % 2 === 0) {
          pdf.setFillColor(250, 250, 250)
          pdf.rect(metricsX, metricsCursorY - 6, metricsW, thisRowH, 'F')
        }

        // separators
        pdf.setDrawColor(230, 230, 230)
        pdf.line(metricsX, metricsCursorY - 6, metricsX + metricsW, metricsCursorY - 6)

        // draw text (top-aligned inside cell)
        pdf.setFont('helvetica', 'normal')
        let tx = metricsX + 5
        let ty = metricsCursorY + 4
        pdf.text(metricLines, tx, ty)

        tx = metricsX + col1W + 8
        pdf.text(valueLines, tx, ty)

        tx = metricsX + col1W + col2W + 12
        pdf.text(benchmarkLines, tx, ty)

        // Color code performance
        if (performance === 'Superior') {
          pdf.setTextColor(34, 197, 94)
        } else if (performance === 'Above') {
          pdf.setTextColor(59, 130, 246)
        } else {
          pdf.setTextColor(239, 68, 68)
        }

        tx = metricsX + col1W + col2W + col3W + 10
        pdf.text(statusLines, tx, ty)
        pdf.setTextColor(0, 0, 0)

        metricsCursorY += thisRowH
      })

      yPosition = metricsCursorY + 10

  // Risk Assessment Section (table)
  checkPageBreak(90)
  pdf.setTextColor(59, 130, 246)
  pdf.setFontSize(14)
  pdf.setFont('helvetica', 'bold')
  pdf.text('Risk Assessment', 20, yPosition)
  pdf.setTextColor(0, 0, 0)
  yPosition += 10

    const riskFactors = [
      { category: 'Market Risk', level: 'High', score: 85, description: 'Competitive market with large incumbents' },
      { category: 'Team Risk', level: 'Low', score: 92, description: 'Strong technical team with domain expertise' },
      { category: 'Financial Risk', level: 'Medium', score: 78, description: 'Limited runway (18 months)' },
      { category: 'Product Risk', level: 'Low', score: 88, description: 'Proven product-market fit with strong traction' },
      { category: 'Operational Risk', level: 'Medium', score: 82, description: 'Scaling challenges in operations' },
      { category: 'Legal Risk', level: 'Low', score: 90, description: 'Clean legal structure and IP protection' }
    ]

    const riskX = 20
    const riskW = pageWidth - 40
    const riskRowH = 12
    const riskTableH = riskFactors.length * riskRowH + riskRowH
    // outer border
    pdf.setDrawColor(200, 200, 200)
    pdf.rect(riskX, yPosition - 6, riskW, riskTableH, 'S')

    // header row
    pdf.setFillColor(245, 245, 245)
    pdf.rect(riskX, yPosition - 6, riskW, riskRowH, 'F')
    pdf.setFont('helvetica', 'bold')
    pdf.text('Category', riskX + 5, yPosition)
    pdf.text('Level (score)', riskX + 70, yPosition)
    pdf.text('Details', riskX + 120, yPosition)
    yPosition += riskRowH

    pdf.setFont('helvetica', 'normal')
    // compute per-row heights based on wrapped details so text does not overlap
    let riskCursorY = yPosition
    riskFactors.forEach((risk, idx) => {
      // split lines for each column
      const catLines = pdf.splitTextToSize(risk.category, 45)
      const levelText = `${risk.level} (${risk.score}/100)`
      const levelLines = pdf.splitTextToSize(levelText, 50)
      pdf.setFontSize(9)
      const detailsLines = pdf.splitTextToSize(risk.description, riskW - 130)
      pdf.setFontSize(10)

      const cellLines = Math.max(catLines.length, levelLines.length, detailsLines.length)
      const thisRowH = Math.max(riskRowH, cellLines * 5 + 6)

      // separator
      pdf.line(riskX, riskCursorY - 4, riskX + riskW, riskCursorY - 4)

      // risk color
      let riskColor: [number, number, number] = [0, 0, 0]
      if (risk.level === 'Low') riskColor = [34, 197, 94]
      else if (risk.level === 'Medium') riskColor = [245, 158, 11]
      else riskColor = [239, 68, 68]

      pdf.setFont('helvetica', 'bold')
      pdf.text(catLines, riskX + 5, riskCursorY + 6)
      pdf.setTextColor(...riskColor)
      pdf.text(levelLines, riskX + 70, riskCursorY + 6)
      pdf.setTextColor(0, 0, 0)

      pdf.setFont('helvetica', 'normal')
      pdf.setFontSize(9)
      pdf.text(detailsLines, riskX + 120, riskCursorY + 6)
      pdf.setFontSize(10)

      riskCursorY += thisRowH
    })
    yPosition = riskCursorY + 6

  // Market Analysis Section
  checkPageBreak(50)
  pdf.setTextColor(59, 130, 246)
  pdf.setFontSize(14)
  pdf.setFont('helvetica', 'bold')
  pdf.text('Market Analysis', 20, yPosition)
  pdf.setTextColor(0, 0, 0)
  yPosition += 12

    pdf.setFontSize(10)
    pdf.setFont('helvetica', 'normal')
    const marketData = [
      ['Total Addressable Market (TAM):', '$12.4B'],
      ['Serviceable Addressable Market (SAM):', '$4.2B'],
      ['Serviceable Obtainable Market (SOM):', '$840M'],
      ['Market Growth Rate (CAGR):', '12-15%'],
      ['Market Maturity:', 'Growth Stage'],
      ['Key Competitors:', '5-10 Major Players'],
      ['Regulatory Environment:', 'Medium Risk']
    ]

    // Market Analysis as table
    const marketX = 20
    const marketW = pageWidth - 40
    const marketRowH = 8
    const marketH = marketData.length * marketRowH
    pdf.setDrawColor(200, 200, 200)
    pdf.rect(marketX, yPosition, marketW, marketH, 'S')
    marketData.forEach(([label, value], idx) => {
      const rowY = yPosition + idx * marketRowH
      pdf.setFont('helvetica', 'bold')
      pdf.text(label as string, marketX + 4, rowY + 6)
      pdf.setFont('helvetica', 'normal')
      pdf.text(value as string, marketX + 120, rowY + 6)
      // separator
      pdf.line(marketX, rowY, marketX + marketW, rowY)
    })
    yPosition += marketH + 12

    // Investment Recommendation Section
    // Investment Recommendation Section - rounded box with dark curved border and light background
    checkPageBreak(60)
    const recX = 15
    const recW = pageWidth - 30
    const recH = 45
    const recRadius = 4

    // Background (light green) and dark green border from project palette
    pdf.setFillColor(237, 250, 241) // light green background
    // Draw filled rounded rect (fill)
    // roundedRect may be available in jsPDF; fallback to regular rect if not
    // draw fill first
    try {
      // @ts-ignore
      pdf.roundedRect(recX, yPosition - 6, recW, recH, recRadius, recRadius, 'F')
      pdf.setDrawColor(34, 97, 44) // darker green border
      pdf.setLineWidth(1.8)
      // @ts-ignore
      pdf.roundedRect(recX, yPosition - 6, recW, recH, recRadius, recRadius, 'S')
    } catch (e) {
      // fallback
      pdf.rect(recX, yPosition - 6, recW, recH, 'F')
      pdf.setDrawColor(34, 97, 44)
      pdf.setLineWidth(1.8)
      pdf.rect(recX, yPosition - 6, recW, recH, 'S')
    }

    pdf.setFontSize(16)
    pdf.setFont('helvetica', 'bold')
    pdf.setTextColor(34, 97, 44)
    pdf.text('Investment Recommendation: STRONG BUY', recX + 8, yPosition + 2)
    pdf.setTextColor(0, 0, 0)
    yPosition += 12

    pdf.setFontSize(10)
    pdf.setFont('helvetica', 'normal')
    const recommendationText = `Based on our comprehensive analysis, ${companyData.name} represents a strong investment opportunity. The company demonstrates superior financial metrics across key indicators, maintains a strong competitive position, and shows consistent growth trajectory. The experienced team and proven market traction reduce execution risk, making this suitable for portfolio inclusion with standard due diligence procedures.`

    const recLines = pdf.splitTextToSize(recommendationText, recW - 24)
    pdf.text(recLines, recX + 8, yPosition + 6)
    yPosition += recH + 8

    // Next Steps Section
    checkPageBreak(30)
    pdf.setFontSize(12)
    pdf.setFont('helvetica', 'bold')
    pdf.text('Recommended Next Steps:', 20, yPosition)
    yPosition += 10

    pdf.setFontSize(10)
    pdf.setFont('helvetica', 'normal')
    const nextSteps = [
      '• Schedule management presentation and Q&A session',
      '• Review detailed financial models and projections',
      '• Conduct customer reference calls and market validation',
      '• Perform technical and legal due diligence',
      '• Negotiate term sheet and investment structure'
    ]

    nextSteps.forEach(step => {
      pdf.text(step, 25, yPosition)
      yPosition += 6
    })

    // Footer on each page
    const addFooter = (pageNum: number, totalPages: number) => {
      pdf.setFontSize(8)
      pdf.setTextColor(128, 128, 128)
      pdf.text(`Generated on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}`, 20, pageHeight - 10)
      pdf.text(`Investly.ai - AI-Powered Investment Analysis`, pageWidth - 20, pageHeight - 10, { align: 'right' })
      pdf.text(`Page ${pageNum} of ${totalPages}`, pageWidth / 2, pageHeight - 10, { align: 'center' })
    }

    // Add footer to all pages
    const totalPages = pdf.getNumberOfPages()
    for (let i = 1; i <= totalPages; i++) {
      pdf.setPage(i)
      addFooter(i, totalPages)
    }

    // Save the PDF
    const fileName = `${companyData.name.replace(/[^a-zA-Z0-9]/g, '_')}_Detailed_Deal_Note.pdf`
    pdf.save(fileName)

    return { success: true, fileName }
  } catch (error) {
    console.error('Error generating detailed PDF:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}