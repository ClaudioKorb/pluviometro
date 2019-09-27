#include <stdio.h>
#include <stdlib.h>
#include <sys/socket.h>
#include <sys/stat.h>
#include <sys/types.h>
#include <netinet/in.h>
#include <arpa/inet.h>

#define PORT 10101
#define BACKLOG 1
/* ROUTER IP 100.64.22.136 */
int main(){
  int socket_fd, socket_client, tam, *new_socket;

  struct sockaddr_in server, client;

  socket_fd = socket(AF_INET, SOCK_STREAM, 0);
  if(socket_fd == -1){
    printf("Error creating socket");
    return -1;
  }
  printf("Socket created\n");

  server.sin_family = AF_INET;
  server.sin_addr.s_addr = INADDR_ANY;
  server.sin_port = htons(PORT);

  if(bind(socket_fd, (struct sockaddr *)&server, sizeof(server)) < 0){
    printf("Error on binding server to port");
    return -2;
  }

  printf("Server bound to port %d\n", PORT);

  while(1){
      listen(socket_fd, BACKLOG);
      //printf("Waiting connection...");
       tam = sizeof(struct sockaddr_in);
    while(socket_client = accept(socket_fd, (struct sockaddr*)&client, (socklen_t*)&tam)){
      struct in_addr ipAddr = client.sin_addr;
      char ip[INET_ADDRSTRLEN];
      inet_ntop(AF_INET, &ipAddr, ip, INET_ADDRSTRLEN);
      printf("Client connected: %s\n", ip);
      new_socket = (int*)malloc(sizeof(int));
      *new_socket = socket_client;
      if(socket_client < 0){
        printf("Accept error");
        return -3;
      }
    }
  }

  return 0;
}
