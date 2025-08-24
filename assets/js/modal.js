function openModal() {
	const modal = document.getElementById("modalOverlay")
	modal.classList.add("active")
	document.body.style.overflow = "hidden"
}

function closeModal(event) {
	if (event && event.target !== event.currentTarget) return

	const modal = document.getElementById("modalOverlay")
	modal.classList.remove("active")
	document.body.style.overflow = "auto"

	// Reset form
	document.getElementById("profileForm").reset()
	hideSuccessMessage()
}

function togglePassword(fieldId) {
	const field = document.getElementById(fieldId)
	const toggleBtn = field.nextElementSibling

	if (field.type === "password") {
		field.type = "text"
		toggleBtn.textContent = "🙈"
	} else {
		field.type = "password"
		toggleBtn.textContent = "👁"
	}
}

function showSuccessMessage() {
	const message = document.getElementById("successMessage")
	message.classList.add("show")

	setTimeout(() => {
		hideSuccessMessage()
	}, 3000)
}

function hideSuccessMessage() {
	const message = document.getElementById("successMessage")
	message.classList.remove("show")
}

// Form submission
document.getElementById("profileForm").addEventListener("submit", function (e) {
	e.preventDefault()

	const currentPassword = document.getElementById("currentPassword").value
	const newPassword = document.getElementById("newPassword").value
	const confirmPassword = document.getElementById("confirmPassword").value

	// Basic validation
	if (!currentPassword || !newPassword || !confirmPassword) {
		alert("Please fill in all password fields")
		return
	}

	if (newPassword !== confirmPassword) {
		alert("New passwords do not match")
		return
	}

	if (newPassword.length < 6) {
		alert("New password must be at least 6 characters long")
		return
	}

	if (currentPassword === newPassword) {
		alert("New password must be different from current password")
		return
	}

	// Simulate password update
	const submitBtn = document.querySelector(".btn-primary")
	const originalText = submitBtn.textContent
	submitBtn.textContent = "Updating..."
	submitBtn.disabled = true

	setTimeout(() => {
		submitBtn.textContent = originalText
		submitBtn.disabled = false
		showSuccessMessage()

		// Clear password fields
		document.getElementById("currentPassword").value = ""
		document.getElementById("newPassword").value = ""
		document.getElementById("confirmPassword").value = ""
	}, 1500)
})

// Close modal with Escape key
document.addEventListener("keydown", function (e) {
	if (e.key === "Escape") {
		closeModal()
	}
})

// Prevent modal from closing when clicking inside
document
	.querySelector(".modal-content")
	.addEventListener("click", function (e) {
		e.stopPropagation()
	})

// Add some nice animations to form inputs
const inputs = document.querySelectorAll(".form-input:not([disabled])")
inputs.forEach((input) => {
	input.addEventListener("focus", function () {
		this.style.transform = "scale(1.02)"
	})

	input.addEventListener("blur", function () {
		this.style.transform = "scale(1)"
	})
})
const tap = document.querySelector(".profile")
tap.addEventListener("click", function () {
	const toggleMenu = document.querySelector(".menu")
	toggleMenu.classList.toggle("active")
})

document.addEventListener("DOMContentLoaded", function () {
	const form = document.getElementById("calculatorForm")
	const button = document.querySelector(".calculate-btn")

	// Add click event to button
	button.addEventListener("click", function (e) {
		e.preventDefault()
		console.log("Button clicked!") // Debug log
		calculateCost()
	})

	// Also add submit event to form
	form.addEventListener("submit", function (e) {
		e.preventDefault()
		console.log("Form submitted!") // Debug log
		calculateCost()
	})
})

function calculateCost() {
	console.log("calculateCost function called") // Debug log

	try {
		// Get form values
		const weight = parseFloat(document.getElementById("weight").value) || 5
		const length = parseFloat(document.getElementById("length").value) || 12
		const width = parseFloat(document.getElementById("width").value) || 32
		const height = parseFloat(document.getElementById("height").value) || 123
		const cargoType = document.getElementById("cargoType").value
		const pickupCourier = document.getElementById("pickupCourier").value
		const deliveryCourier = document.getElementById("deliveryCourier").value

		console.log("Values:", { weight, length, width, height, cargoType }) // Debug log

		// Calculate volume in cubic centimeters, then convert
		const volumeCm3 = length * width * height
		const volumeM3 = volumeCm3 / 1000000 // convert cm³ to m³

		// Base price calculation - simplified
		let baseCost = 30 // Base cost
		baseCost += weight * 3 // Add cost per kg
		baseCost += volumeM3 * 500 // Add cost per cubic meter

		// Cargo type multiplier
		const cargoMultipliers = {
			documents: 1.0,
			electronics: 1.5,
			clothing: 1.2,
			food: 1.3,
			other: 1.1,
		}

		if (cargoType && cargoMultipliers[cargoType]) {
			baseCost *= cargoMultipliers[cargoType]
		}

		// Additional services
		let additionalCost = 0
		if (pickupCourier === "yes") {
			additionalCost += 25
		}
		if (deliveryCourier === "yes") {
			additionalCost += 25
		}

		const totalCost = baseCost + additionalCost

		console.log("Calculated cost:", totalCost) // Debug log

		// Update result display
		document.getElementById("resultCargoType").textContent = cargoType || "null"
		document.getElementById("resultService").textContent =
			additionalCost > 0 ? `+ ${additionalCost} TMT` : "+ 0 TMT"
		document.getElementById("totalCost").textContent = `${totalCost.toFixed(
			2
		)} TMT`

		// Show results
		const resultSection = document.getElementById("resultSection")
		resultSection.style.display = "block"

		// Smooth scroll to results
		resultSection.scrollIntoView({
			behavior: "smooth",
			block: "nearest",
		})

		console.log("Results displayed") // Debug log
	} catch (error) {
		console.error("Error in calculateCost:", error)
		alert("Произошла ошибка при расчете стоимости")
	}
}

function closeModal() {
	// In a real implementation, this might close the modal
	// For this demo, we'll just hide the results
	document.getElementById("resultSection").style.display = "none"
}

function closeModal() {
	// In a real implementation, this might close the modal
	// For this demo, we'll just hide the results
	document.getElementById("resultSection").style.display = "none"
}
