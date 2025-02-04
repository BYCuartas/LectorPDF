import { Component, type ElementRef, ViewChild } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"
import { HttpClient, HttpClientModule } from "@angular/common/http"


@Component({
  selector: "vex-lector-pdf",
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: "./lector-pdf.component.html",
  styleUrls: ["./lector-pdf.component.scss"],
})
export class LectorPdfComponent {
  @ViewChild("fileInput") fileInput!: ElementRef<HTMLInputElement>
  @ViewChild("pdfViewer") pdfViewer!: ElementRef<HTMLIFrameElement>
  @ViewChild("pdfThumbnail") pdfThumbnail!: ElementRef<HTMLImageElement>;
  selectedFile: File | null = null
  errorMessage: string | null = null
  uploadProgress = 0
  isDragging = false
  showPdfView = false
  extractedText = ""
  isLoadingPdf = false
  idCardInfo = ""
  pdfSrc: string | ArrayBuffer | null = null

  onDragOver(event: DragEvent): void {
    event.preventDefault()
    event.stopPropagation()
    this.isDragging = true
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault()
    event.stopPropagation()
    this.isDragging = false
  }

  onDrop(event: DragEvent): void {
    event.preventDefault()
    event.stopPropagation()
    this.isDragging = false

    if (event.dataTransfer && event.dataTransfer.files.length > 0) {
      const file = event.dataTransfer.files[0]
      this.handleFile(file)
    }
  }

  openFileBrowser(): void {
    this.fileInput.nativeElement.click()
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement
    if (input.files && input.files.length > 0) {
      const file = input.files[0]
      this.handleFile(file)
    }
  }


  validateFile(file: File): boolean {
    const MAX_SIZE_MB = 10;
    const allowedTypes = ["application/pdf", "image/tiff"];
    return allowedTypes.includes(file.type) && file.size <= MAX_SIZE_MB * 1024 * 1024;
  }  


  simulateUpload(): void {
    this.uploadProgress = 0
    const interval = setInterval(() => {
      this.uploadProgress += 10
      if (this.uploadProgress >= 100) {
        clearInterval(interval)
      }
    }, 200)
  }

  onProcessText(): void {
    if (this.selectedFile) {
      this.showPdfView = true
      this.loadPdfInViewer()
      this.extractTextFromPdf()
    } else {
      this.errorMessage = "Por favor selecciona un archivo PDF primero."
    }
  }

  loadPdfInViewer(): void {
    if (this.selectedFile) {
        const fileUrl = URL.createObjectURL(this.selectedFile);
        this.pdfViewer.nativeElement.src = fileUrl;
    }
  }

  constructor(private http: HttpClient) {}

  handleFile(file: File): void {
    if (this.validateFile(file)) {
      this.selectedFile = file
      this.errorMessage = null
      this.simulateUpload()
      this.loadPdfPreview(file)
    } else {
      this.errorMessage = "Por favor selecciona un archivo PDF válido."
      this.selectedFile = null
      this.uploadProgress = 0
      this.pdfSrc = null
    }
  }

  loadPdfPreview(file: File): void {
    const reader = new FileReader()
    reader.onload = (e: any) => {
      this.pdfSrc = e.target.result
    }
    reader.readAsArrayBuffer(file)
  }

  extractTextFromPdf(): void {
    if (!this.selectedFile) {
      this.errorMessage = "Por favor selecciona un archivo PDF primero."
      return
    }

    const formData = new FormData()
    formData.append("file", this.selectedFile)

    this.http
      .post<{ text: string; corrected_text: string; id_card_info: string }>(
        "http://127.0.0.1:5001/extract-text",
        formData,
      )
      .subscribe({
        next: (response) => {
          console.log("Respuesta del servidor:", response)
          this.extractedText = response.corrected_text || response.text || "No se pudo extraer texto del PDF."
          this.idCardInfo = response.id_card_info
          this.showPdfView = true
        },
        error: (err) => {
          console.error("Error al extraer texto:", err)
          this.errorMessage = "Ocurrió un error al procesar el archivo. Inténtalo nuevamente."
        },
        complete: () => {
          console.log("Extracción de texto completada.")
        },
      })
  }

  onCancel(): void {
    this.selectedFile = null
    this.errorMessage = null
    this.uploadProgress = 0
    this.showPdfView = false
    this.extractedText = ""
    this.isLoadingPdf = false
    this.pdfSrc = null
    console.log("Selección de archivo cancelada.")
  }
}

