#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/core/aspnet:3.1-buster-slim AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/core/sdk:3.1-buster AS build
WORKDIR /src
COPY ["Projekt Aplikacje/Projekt Aplikacje.csproj", "Projekt Aplikacje/"]
RUN dotnet restore "Projekt Aplikacje/Projekt Aplikacje.csproj"

# Setup NodeJs
RUN apt-get update && apt-get install -y --no-install-recommends apt-utils
RUN apt-get install -y wget && \
    apt-get install -y gnupg2 && \
    wget -qO- https://deb.nodesource.com/setup_14.x | bash - && \
    apt-get install -y build-essential nodejs

COPY . .
WORKDIR "/src/Projekt Aplikacje"
RUN dotnet build "Projekt Aplikacje.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Projekt Aplikacje.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Projekt Aplikacje.dll"]