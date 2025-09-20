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
    let yPosition = 30

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

    // Company Overview Section
    checkPageBreak(60)
    pdf.setFontSize(14)
    pdf.setFont('helvetica', 'bold')
    pdf.text('Company Overview', 20, yPosition)
    yPosition += 10

    // Company details in a structured format
    pdf.setFontSize(10)
    pdf.setFont('helvetica', 'normal')

    const companyDetails = [
      ['Sector:', companyData.sector],
      ['Current Revenue:', companyData.arr],
      ['Funding Stage:', companyData.stage],
      ['Founded:', companyData.founded],
      ['Team Size:', companyData.employees],
      ['Location:', companyData.location],
      ['Last Analysis:', companyData.analyzed]
    ]

    companyDetails.forEach(([label, value]) => {
      pdf.setFont('helvetica', 'bold')
      pdf.text(label, 20, yPosition)
      pdf.setFont('helvetica', 'normal')
      pdf.text(value, 70, yPosition)
      yPosition += 6
    })

    yPosition += 5

    // Description
    pdf.setFont('helvetica', 'bold')
    pdf.text('Description:', 20, yPosition)
    yPosition += 7
    pdf.setFont('helvetica', 'normal')
    const descLines = pdf.splitTextToSize(companyData.description, pageWidth - 40)
    pdf.text(descLines, 20, yPosition)
    yPosition += descLines.length * 5 + 15

    // Financial Metrics Section
    checkPageBreak(80)
    pdf.setFontSize(14)
    pdf.setFont('helvetica', 'bold')
    pdf.text('Key Performance Metrics', 20, yPosition)
    yPosition += 15

    // Create a table for metrics
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

    // Table headers
    pdf.setFillColor(240, 240, 240)
    pdf.rect(20, yPosition - 5, pageWidth - 40, 8, 'F')
    pdf.setFont('helvetica', 'bold')
    pdf.text('Metric', 25, yPosition)
    pdf.text('Value', 80, yPosition)
    pdf.text('Benchmark', 120, yPosition)
    pdf.text('Status', 160, yPosition)
    yPosition += 10

    pdf.setFont('helvetica', 'normal')
    metrics.slice(1).forEach(([metric, value, benchmark, performance]) => {
      pdf.text(metric, 25, yPosition)
      pdf.text(value, 80, yPosition)
      pdf.text(benchmark, 120, yPosition)

      // Color code performance
      if (performance === 'Superior') {
        pdf.setTextColor(34, 197, 94) // Green
      } else if (performance === 'Above') {
        pdf.setTextColor(59, 130, 246) // Blue
      } else {
        pdf.setTextColor(239, 68, 68) // Red
      }
      pdf.text(performance, 160, yPosition)
      pdf.setTextColor(0, 0, 0) // Reset to black

      yPosition += 7
    })

    yPosition += 15

    // Risk Assessment Section
    checkPageBreak(70)
    pdf.setFontSize(14)
    pdf.setFont('helvetica', 'bold')
    pdf.text('Risk Assessment', 20, yPosition)
    yPosition += 15

    const riskFactors = [
      { category: 'Market Risk', level: 'High', score: 85, description: 'Competitive market with large incumbents' },
      { category: 'Team Risk', level: 'Low', score: 92, description: 'Strong technical team with domain expertise' },
      { category: 'Financial Risk', level: 'Medium', score: 78, description: 'Limited runway (18 months)' },
      { category: 'Product Risk', level: 'Low', score: 88, description: 'Proven product-market fit with strong traction' },
      { category: 'Operational Risk', level: 'Medium', score: 82, description: 'Scaling challenges in operations' },
      { category: 'Legal Risk', level: 'Low', score: 90, description: 'Clean legal structure and IP protection' }
    ]

    pdf.setFontSize(10)
    riskFactors.forEach((risk) => {
      checkPageBreak(15)

      // Risk level color coding
      let riskColor: [number, number, number] = [0, 0, 0]
      if (risk.level === 'Low') riskColor = [34, 197, 94]
      else if (risk.level === 'Medium') riskColor = [245, 158, 11]
      else riskColor = [239, 68, 68]

      pdf.setFont('helvetica', 'bold')
      pdf.text(risk.category, 20, yPosition)
      pdf.setTextColor(...riskColor)
      pdf.text(`${risk.level} (${risk.score}/100)`, 80, yPosition)
      pdf.setTextColor(0, 0, 0)
      yPosition += 5

      pdf.setFont('helvetica', 'normal')
      const riskDesc = pdf.splitTextToSize(risk.description, pageWidth - 60)
      pdf.text(riskDesc, 25, yPosition)
      yPosition += riskDesc.length * 4 + 8
    })

    // Market Analysis Section
    checkPageBreak(50)
    pdf.setFontSize(14)
    pdf.setFont('helvetica', 'bold')
    pdf.text('Market Analysis', 20, yPosition)
    yPosition += 15

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

    marketData.forEach(([label, value]) => {
      pdf.setFont('helvetica', 'bold')
      pdf.text(label, 20, yPosition)
      pdf.setFont('helvetica', 'normal')
      pdf.text(value, 100, yPosition)
      yPosition += 6
    })

    yPosition += 15

    // Investment Recommendation Section
    checkPageBreak(40)
    pdf.setFillColor(34, 197, 94, 0.1) // Light green background
    pdf.rect(15, yPosition - 8, pageWidth - 30, 35, 'F')

    pdf.setFontSize(16)
    pdf.setFont('helvetica', 'bold')
    pdf.setTextColor(34, 197, 94)
    pdf.text('Investment Recommendation: STRONG BUY', 20, yPosition)
    pdf.setTextColor(0, 0, 0)
    yPosition += 12

    pdf.setFontSize(10)
    pdf.setFont('helvetica', 'normal')
    const recommendationText = `Based on our comprehensive analysis, ${companyData.name} represents a strong investment opportunity. The company demonstrates superior financial metrics across key indicators, maintains a strong competitive position, and shows consistent growth trajectory. The experienced team and proven market traction reduce execution risk, making this suitable for portfolio inclusion with standard due diligence procedures.`

    const recLines = pdf.splitTextToSize(recommendationText, pageWidth - 50)
    pdf.text(recLines, 20, yPosition)
    yPosition += recLines.length * 5 + 15

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
      pdf.text(`InvestIQ - AI-Powered Investment Analysis`, pageWidth - 20, pageHeight - 10, { align: 'right' })
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