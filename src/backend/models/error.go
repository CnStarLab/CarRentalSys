package models

import "errors"

var (
	ErrUserNotFound      = errors.New("user not found")
	ErrCarNotFound       = errors.New("car not found")
	ErrCarNotAvailable   = errors.New("car is not available")
	ErrUserCarNotFound   = errors.New("UserCar relation not found")
	ErrPreloadNotAllowed = errors.New("preload connection not found")
	ErrNoCarsMatch       = errors.New("no cars match with conditions")
	ErrNoBookInfoExist   = errors.New("no order info for the user")
)
