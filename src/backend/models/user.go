package models

import (
	"carRentalSys/config"
	"time"

	"github.com/dgrijalva/jwt-go"
	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	Username string `json:"username" gorm:"unique;not null"`
	Email    string `json:"email" gorm:"unique;not null"`
	Password string `json:"password" gorm:"not null"`
	UserPic  string `json:"userPic"`

	Comments []Comment2User `json:"comments2user"`
	Favorit  []FavoriteCars `json:"favoriteCars"`
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

type JWTClaims struct {
	Email string `json:"email"`
	jwt.StandardClaims
}

//==========================================================================//

func CreateUser(db *gorm.DB, user *User) error {
	return db.Create(user).Error
}

func (u *User) FindByEmail(db *gorm.DB, email string) error {
	if err := db.Where("email = ?", email).First(u).Error; err != nil {

		return err
	}
	return nil
}

func (u *User) FindByID(db *gorm.DB, ID uint64) error {
	if err := db.Where("id = ?", ID).First(u).Error; err != nil {
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

// ==============================Token=======================================//
func (u *User) GenerateToken() (string, error) {
	expirationTime := time.Now().Add(24 * time.Hour)
	claims := &JWTClaims{
		Email: u.Email,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: expirationTime.Unix(),
			IssuedAt:  time.Now().Unix(),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString(config.JwtSecret)
}

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
