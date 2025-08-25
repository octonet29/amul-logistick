function openModal() {
	const modal = document.getElementById("modalOverlay")
	if (modal) {
		modal.classList.add("active")
		document.body.style.overflow = "hidden"
	}
}

function closeModal(event) {
	// Если событие передано и клик был не по overlay, не закрываем модал
	if (event && event.target !== event.currentTarget) return

	const modal = document.getElementById("modalOverlay")
	if (modal) {
		modal.classList.remove("active")
		document.body.style.overflow = "auto"

		// Reset form если он существует
		const profileForm = document.getElementById("profileForm")
		if (profileForm) {
			profileForm.reset()
		}
		hideSuccessMessage()
	}

	// Также скрываем результаты калькулятора если они есть
	const resultSection = document.getElementById("resultSection")
	if (resultSection) {
		resultSection.style.display = "none"
	}
}

function togglePassword(fieldId) {
	const field = document.getElementById(fieldId)
	if (!field) return

	const toggleBtn = field.nextElementSibling

	if (field.type === "password") {
		field.type = "text"
		if (toggleBtn) toggleBtn.textContent = "🙈"
	} else {
		field.type = "password"
		if (toggleBtn) toggleBtn.textContent = "👁"
	}
}

function showSuccessMessage() {
	const message = document.getElementById("successMessage")
	if (message) {
		message.classList.add("show")

		setTimeout(() => {
			hideSuccessMessage()
		}, 3000)
	}
}

function hideSuccessMessage() {
	const message = document.getElementById("successMessage")
	if (message) {
		message.classList.remove("show")
	}
}

// Инициализация после загрузки DOM
document.addEventListener("DOMContentLoaded", function () {
	// Form submission для профиля
	const profileForm = document.getElementById("profileForm")
	if (profileForm) {
		profileForm.addEventListener("submit", function (e) {
			e.preventDefault()

			const currentPassword = document.getElementById("currentPassword")?.value
			const newPassword = document.getElementById("newPassword")?.value
			const confirmPassword = document.getElementById("confirmPassword")?.value

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
			if (submitBtn) {
				const originalText = submitBtn.textContent
				submitBtn.textContent = "Updating..."
				submitBtn.disabled = true

				setTimeout(() => {
					submitBtn.textContent = originalText
					submitBtn.disabled = false
					showSuccessMessage()

					// Clear password fields
					const currentPasswordField =
						document.getElementById("currentPassword")
					const newPasswordField = document.getElementById("newPassword")
					const confirmPasswordField =
						document.getElementById("confirmPassword")

					if (currentPasswordField) currentPasswordField.value = ""
					if (newPasswordField) newPasswordField.value = ""
					if (confirmPasswordField) confirmPasswordField.value = ""
				}, 1500)
			}
		})
	}

	// Калькулятор
	const calculatorForm = document.getElementById("calculatorForm")
	const calculateButton = document.querySelector(".calculate-btn")

	if (calculateButton) {
		calculateButton.addEventListener("click", function (e) {
			e.preventDefault()
			console.log("Button clicked!")
			calculateCost()
		})
	}

	if (calculatorForm) {
		calculatorForm.addEventListener("submit", function (e) {
			e.preventDefault()
			console.log("Form submitted!")
			calculateCost()
		})
	}

	// Profile menu toggle
	const profileTap = document.querySelector(".profile")
	if (profileTap) {
		profileTap.addEventListener("click", function () {
			const toggleMenu = document.querySelector(".menu")
			if (toggleMenu) {
				toggleMenu.classList.toggle("active")
			}
		})
	}

	// Close modal with Escape key
	document.addEventListener("keydown", function (e) {
		if (e.key === "Escape") {
			closeModal()
		}
	})

	// Prevent modal from closing when clicking inside
	const modalContent = document.querySelector(".modal-content")
	if (modalContent) {
		modalContent.addEventListener("click", function (e) {
			e.stopPropagation()
		})
	}

	// Add animations to form inputs
	const inputs = document.querySelectorAll(".form-input:not([disabled])")
	inputs.forEach((input) => {
		input.addEventListener("focus", function () {
			this.style.transform = "scale(1.02)"
		})

		input.addEventListener("blur", function () {
			this.style.transform = "scale(1)"
		})
	})
})

function calculateCost() {
	console.log("calculateCost function called")

	try {
		// Get form values
		const weight = parseFloat(document.getElementById("weight")?.value) || 5
		const length = parseFloat(document.getElementById("length")?.value) || 12
		const width = parseFloat(document.getElementById("width")?.value) || 32
		const height = parseFloat(document.getElementById("height")?.value) || 123
		const cargoType = document.getElementById("cargoType")?.value
		const pickupCourier = document.getElementById("pickupCourier")?.value
		const deliveryCourier = document.getElementById("deliveryCourier")?.value

		console.log("Values:", { weight, length, width, height, cargoType })

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

		console.log("Calculated cost:", totalCost)

		// Update result display
		const resultCargoType = document.getElementById("resultCargoType")
		const resultService = document.getElementById("resultService")
		const totalCostElement = document.getElementById("totalCost")

		if (resultCargoType) {
			resultCargoType.textContent = cargoType || "null"
		}
		if (resultService) {
			resultService.textContent =
				additionalCost > 0 ? `+ ${additionalCost} TMT` : "+ 0 TMT"
		}
		if (totalCostElement) {
			totalCostElement.textContent = `${totalCost.toFixed(2)} TMT`
		}

		// Show results
		const resultSection = document.getElementById("resultSection")
		if (resultSection) {
			resultSection.style.display = "block"

			// Smooth scroll to results
			resultSection.scrollIntoView({
				behavior: "smooth",
				block: "nearest",
			})
		}

		console.log("Results displayed")
	} catch (error) {
		console.error("Error in calculateCost:", error)
		alert("Произошла ошибка при расчете стоимости")
	}
}

// Airplane cursor effects
var body = document.body
var cursor = document.querySelector(".airplane-cursor")
var airplane = document.querySelector(".airplane")
var trails = document.querySelectorAll(".airplane-trail")
var cursorSmalls = document.querySelectorAll(".cursor-small")
var cursorBigs = document.querySelectorAll(".cursor-big")

let mouseX = 0
let mouseY = 0
let prevX = 0
let prevY = 0

// Main cursor movement
if (body && cursor) {
	body.addEventListener("mousemove", function (event) {
		mouseX = event.clientX
		mouseY = event.clientY

		// Calculate rotation based on movement direction
		const deltaX = mouseX - prevX
		const deltaY = mouseY - prevY
		const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI)

		if (typeof gsap !== "undefined") {
			gsap.to(cursor, {
				x: mouseX,
				y: mouseY,
				duration: 0.3,
				visibility: "visible",
				ease: "power2.out",
				rotation: angle + 90, // +90 because airplane points up by default
			})
		}

		prevX = mouseX
		prevY = mouseY
	})
}

// Trail effect
let trailPositions = []
if (body && trails.length > 0) {
	body.addEventListener("mousemove", function (event) {
		trailPositions.unshift({ x: event.clientX, y: event.clientY })
		if (trailPositions.length > trails.length) {
			trailPositions.pop()
		}

		trails.forEach((trail, index) => {
			if (trailPositions[index] && typeof gsap !== "undefined") {
				gsap.to(trail, {
					x: trailPositions[index].x,
					y: trailPositions[index].y,
					duration: 0.3 + index * 0.1,
					visibility: "visible",
					opacity: 1 - index * 0.2,
					scale: 1 - index * 0.1,
					ease: "power2.out",
				})
			}
		})
	})
}

// Small Cursor Effects
cursorSmalls.forEach((cursorSmall) => {
	cursorSmall.addEventListener("mouseenter", function () {
		if (typeof gsap !== "undefined") {
			gsap.to(cursor, {
				scale: 1.5,
				duration: 0.3,
				ease: "power2.out",
			})
			if (airplane) {
				gsap.to(airplane, {
					fill: "#4facfe",
					duration: 0.3,
				})
			}

			// Enhanced trail effect
			trails.forEach((trail, index) => {
				gsap.to(trail, {
					scale: 1.5,
					backgroundColor: "#4facfe",
					duration: 0.3,
				})
			})
		}
	})

	cursorSmall.addEventListener("mouseleave", function () {
		if (typeof gsap !== "undefined") {
			gsap.to(cursor, {
				scale: 1,
				duration: 0.3,
				ease: "power2.out",
			})
			if (airplane) {
				gsap.to(airplane, {
					fill: "#ffffff",
					duration: 0.3,
				})
			}

			trails.forEach((trail, index) => {
				gsap.to(trail, {
					scale: 1,
					backgroundColor: "rgba(255, 255, 255, 0.6)",
					duration: 0.3,
				})
			})
		}
	})
})

// Big Cursor Effects
cursorBigs.forEach((cursorBig) => {
	cursorBig.addEventListener("mouseenter", function () {
		if (typeof gsap !== "undefined") {
			gsap.to(cursor, {
				scale: 2,
				duration: 0.3,
				ease: "power2.out",
			})
			if (airplane) {
				gsap.to(airplane, {
					fill: "#ff6b6b",
					duration: 0.3,
				})
			}

			// Enhanced trail effect
			trails.forEach((trail, index) => {
				gsap.to(trail, {
					scale: 2,
					backgroundColor: "#ff6b6b",
					duration: 0.3,
				})
			})
		}
	})

	cursorBig.addEventListener("mouseleave", function () {
		if (typeof gsap !== "undefined") {
			gsap.to(cursor, {
				scale: 1,
				duration: 0.3,
				ease: "power2.out",
			})
			if (airplane) {
				gsap.to(airplane, {
					fill: "#ffffff",
					duration: 0.3,
				})
			}

			trails.forEach((trail, index) => {
				gsap.to(trail, {
					scale: 1,
					backgroundColor: "rgba(255, 255, 255, 0.6)",
					duration: 0.3,
				})
			})
		}
	})
})

// Hide cursor when mouse leaves window
document.addEventListener("mouseleave", function () {
	if (typeof gsap !== "undefined") {
		gsap.to(cursor, {
			visibility: "hidden",
			duration: 0.3,
		})
		trails.forEach((trail) => {
			gsap.to(trail, {
				visibility: "hidden",
				duration: 0.3,
			})
		})
	}
})

// Show cursor when mouse enters window
document.addEventListener("mouseenter", function () {
	if (typeof gsap !== "undefined") {
		gsap.to(cursor, {
			visibility: "visible",
			duration: 0.3,
		})
		trails.forEach((trail) => {
			gsap.to(trail, {
				visibility: "visible",
				duration: 0.3,
			})
		})
	}
})
