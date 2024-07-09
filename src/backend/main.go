package main

import (
	"carRentalSys/database"
	_ "carRentalSys/docs"
	"carRentalSys/routes"

	"github.com/gin-gonic/gin"
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
)

func main() {
	r := gin.Default()
	r.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))
	database.ConnectDatabase()
	routes.UserRoutes(r)
	routes.CarRoutes(r)
	r.Run() // listen and serve on 0.0.0.0:8080
}
