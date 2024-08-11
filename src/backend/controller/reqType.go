package controller

type SetCarAvailRequest struct {
	CarID     uint64 `json:"carId" binding:"required"`
	Available *bool  `json:"available" binding:"required"`
}
