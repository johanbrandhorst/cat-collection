package service

import (
	"context"

	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"

	"github.com/johanbrandhorst/cat-collection/service/proto/api/v1"
)

type Server struct{}

var _ api.CatServiceServer = (*Server)(nil)

func (s Server) ListCats(ctx context.Context, req *api.ListCatsRequest) (*api.ListCatsResponse, error) {
	return &api.ListCatsResponse{
		Cats: []*api.Cat{
			{
				Name: "Monty",
			},
			{
				Name: "Olive",
			},
			{
				Name: "Lara",
			},
		},
	}, nil
}

func (s Server) GetFeaturedCats(ctx context.Context, req *api.GetFeaturedCatsRequest) (*api.GetFeaturedCatsResponse, error) {
	return &api.GetFeaturedCatsResponse{
		Cats: []*api.Cat{
			{
				Name: "Monty",
			},
			{
				Name: "Olive",
			},
			{
				Name: "Lara",
			},
		},
	}, nil
}

func (s Server) CreateCat(ctx context.Context, req *api.CreateCatRequest) (*api.Cat, error) {
	return nil, status.Error(codes.Unimplemented, "unimplemented")
}

func (s Server) GetUser(ctx context.Context, req *api.GetUserRequest) (*api.GetUserResponse, error) {
	return nil, status.Error(codes.Unimplemented, "unimplemented")
}
