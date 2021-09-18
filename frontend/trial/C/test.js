import { renderBarcode } from "./C.js"

renderBarcode(
  {
    id: "ezeb2fve0b",
    code: 10,
    message: "404 Error coffee not found"
  },
  document.getElementById('barcode1')
)
renderBarcode(
  {
    id: "Teapot1234",
    code: 0,
    message: "No coffee this is a teapot"
  },
  document.getElementById('barcode2')
)