package main

import (
	"carRentalSys/database"
	"carRentalSys/routes"

	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()
	database.ConnectDatabase()
	routes.UserRoutes(r)
	routes.CarRoutes(r)
	r.Run() // listen and serve on 0.0.0.0:8080
}
