import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

export const exportToPDF = async (elementId: string, filename: string = 'resume.pdf') => {
  try {
    const element = document.getElementById(elementId)
    if (!element) {
      throw new Error('Resume element not found')
    }

    // Create a clone of the element for PDF generation
    const clone = element.cloneNode(true) as HTMLElement
    clone.style.transform = 'none'
    clone.style.width = '210mm'
    clone.style.height = '297mm'
    clone.style.padding = '15mm'
    clone.style.margin = '0'
    clone.style.boxShadow = 'none'
    clone.style.position = 'absolute'
    clone.style.left = '-9999px'
    clone.style.top = '0'
    clone.style.backgroundColor = 'white'
    clone.style.color = 'black'
    
    // Remove any dark mode classes
    clone.classList.remove('dark')
    clone.querySelectorAll('.dark\\:bg-gray-800, .dark\\:text-white, .dark\\:border-gray-700').forEach(el => {
      el.classList.remove('dark:bg-gray-800', 'dark:text-white', 'dark:border-gray-700')
    })

    document.body.appendChild(clone)

    // Generate canvas from the element
    const canvas = await html2canvas(clone, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      width: 210 * 5.90551, // Convert mm to pixels (210mm * 5.90551 px/mm)
      height: 297 * 5.90551, // Convert mm to pixels (297mm * 5.90551 px/mm)
    })

    // Remove the clone from DOM
    document.body.removeChild(clone)

    // Create PDF
    const pdf = new jsPDF('p', 'mm', 'a4')
    const imgData = canvas.toDataURL('image/png')
    
    // Calculate dimensions to fit A4
    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = pdf.internal.pageSize.getHeight()
    const imgWidth = pdfWidth
    const imgHeight = (canvas.height * imgWidth) / canvas.width

    // Add image to PDF
    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight)

    // If content is longer than one page, add new pages
    if (imgHeight > pdfHeight) {
      const pagesNeeded = Math.ceil(imgHeight / pdfHeight)
      
      for (let i = 1; i < pagesNeeded; i++) {
        pdf.addPage()
        const yOffset = -(i * pdfHeight)
        pdf.addImage(imgData, 'PNG', 0, yOffset, imgWidth, imgHeight)
      }
    }

    // Save the PDF
    pdf.save(filename)
    
    return true
  } catch (error) {
    console.error('Error generating PDF:', error)
    throw error
  }
} 