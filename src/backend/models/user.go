package models

import (
	"carRentalSys/config"
	"fmt"
	"time"

	"errors"

	"github.com/dgrijalva/jwt-go"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

// ==========================1.Data Base Table Mapping Structure============================//
type User struct {
	gorm.Model
	Username  string `json:"username" gorm:"unique;not null"`
	Email     string `json:"email" gorm:"unique;not null"`
	Password  string `json:"password" gorm:"not null"`
	FirstName string `json:"firstName"`
	LastName  string `json:"lastName"`
	UserPic   string `json:"userPic"`

	Comments []Comment2User `json:"comments2user"`
	Favorit  []FavoriteCars `json:"favoriteCars"`
	MyCars   []Car          `gorm:"foreignKey:OwnerId"`
}

type Comment2User struct {
	gorm.Model
	BookId       uint              `json:"bookId"`
	UserId       uint              `json:"userId" gorm:"primaryKe"`
	CarId        uint              `json:"carId"`
	TitleContent string            `json:"titileContent"`
	MainContent  string            `json:"mainContent"`
	Likes        uint              `json:"likes"`
	PicNames     []Comment2UserPic `json:"photos" gorm:"foreignKey:Comment2UserID"`
}

type Comment2UserPic struct {
	gorm.Model
	FileName       string `json:"fileName"`
	Comment2UserID uint   `json:"comment2CarId"`
}

//==========================2.Service Structure============================//

type UserProfile struct {
	gorm.Model
	FirstName string `json:"firstName"`
	LastName  string `json:"lastName"`
	Username  string `json:"username"`
	Email     string `json:"email"`
	UserPic   string `json:"userPic"`
	MyCars    []Car  `json:"myCars"`
}

type JWTClaims struct {
	ID    uint   `json:"userId"`
	Email string `json:"email"`
	jwt.StandardClaims
}

//========================3.Function for Service===============================//

func CreateUser(db *gorm.DB, user *User) error {
	return db.Create(user).Error
}

// hash
func HashPassword(user *User) error {
	// Check if the passwd is empty
	if user.Password == "" {
		return errors.New("password cannot be empty")
	}
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	if err != nil {
		return err
	}

	user.Password = string(hashedPassword)

	return nil
}

func ComparePassword(user *User, providedPassword string) (bool, error) {
	// Check if hashed passwd is empty
	if user.Password == "" {
		return false, errors.New("hashed password cannot be empty")
	}
	err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(providedPassword))
	if err != nil {
		// if not match
		if err == bcrypt.ErrMismatchedHashAndPassword {
			return false, nil
		}
		return false, err
	}

	return true, nil
}

// token
func ParseToken(tokenString string) (*JWTClaims, error) {
	claims := &JWTClaims{}
	token, err := jwt.ParseWithClaims(tokenString, claims, func(token *jwt.Token) (interface{}, error) {
		return config.JwtSecret, nil
	})

	if err != nil || !token.Valid {
		return nil, err
	}

	return claims, nil
}

// ===========================Function for Types========================================//
func (u *User) FindByEmail(db *gorm.DB, email string) error {
	if err := db.Where("email = ?", email).First(u).Error; err != nil {

		return err
	}
	return nil
}

func (u *User) FindByID(db *gorm.DB, ID uint) error {
	if err := db.Preload("MyCars").Where("id = ?", ID).First(u).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			return ErrUserNotFound
		}
		return err
	}
	return nil
}

func (u *User) ValidatePassword(password string) bool {
	return u.Password == password
}

func (u *User) SearchOwnCar(db *gorm.DB) (bool, []Car) {
	var cars Cars
	if err := db.Model(u).Association("MyCars").Find(&cars); err != nil {
		return false, nil
	}
	return len(cars) > 0, cars
}

// token
func (u *User) GenerateToken() (string, error) {
	expirationTime := time.Now().Add(24 * time.Hour)
	fmt.Println("[Gen Token] UserId", u.ID, "  Email:", u.Email)
	claims := &JWTClaims{
		ID:    u.ID,
		Email: u.Email,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: expirationTime.Unix(),
			IssuedAt:  time.Now().Unix(),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString(config.JwtSecret)
}
