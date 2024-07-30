package main

import (
	"carRentalSys/database"
	_ "carRentalSys/docs"
	"carRentalSys/routes"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
)

// @title Car Rental System API
// @version 1.0
// @description This is a car rental system API.

// @contact.email cheayuki13@gmail.com

// @license.name Apache 2.0
// @license.url http://www.apache.org/licenses/LICENSE-2.0.html

// @host localhost:8080
// @BasePath /api/v1
func main() {
	r := gin.Default()
	r.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))

	r.Use(cors.Default())

	// 或者自定义 CORS 配置
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000"},
		AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}))

	database.ConnectDatabase()
	routes.UserRoutes(r)
	routes.CarRoutes(r)
	routes.BookingRoutes(r)
	routes.UploadRoutes(r)
	r.Run() // listen and serve on 0.0.0.0:8080
}
