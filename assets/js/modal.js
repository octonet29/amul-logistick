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
