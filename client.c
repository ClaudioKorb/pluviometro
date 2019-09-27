#include <sys/types.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <arpa/inet.h>
#include <netdb.h>
#include <unistd.h>
#include <string.h>
#include <stdio.h>
#include <stdlib.h>

#define PORT 10101

int main(){
 struct sockaddr_in adress;
 int sock = 0, valread;                                                        // SOCKET PARA O CLIENTE
 struct sockaddr_in serv_addr; // ENDEREÇO DO SERVIDOR
 struct addrinfo hints, *res;
 memset(&hints, 0, sizeof(hints));
 hints.ai_family = AF_UNSPEC;
 hints.ai_socktype = SOCK_STREAM;

 if(getaddrinfo("100.64.22.136", "http", &hints, &res) != 0){
   printf("Não foi possivel conectar ao servidor");
   return -1;
 }

 if((sock = socket(res->ai_family, res->ai_socktype, res->ai_protocol)) < 0){
   printf("Erro ao criar o socket!");
   return -2;
 }

 memset(&serv_addr, '0', sizeof(serv_addr));                                   // PREENCHE SERV_ADDR COM '0'

 serv_addr.sin_family = AF_INET;                                               // FAMILIA IPV4
 serv_addr.sin_port = htons(PORT);                                             // PORT DO SERVIDOR     htons = host to network (se necessário inverte a ordem dos bits)

 if(inet_pton(AF_INET, "100.64.22.136", &serv_addr.sin_addr) <= 0)                 // CONVERTENDO O IP DE 'CHAR' PARA IPV4 -- 127.0.0.1 => Loopback adress = esta máquina
 {                                                                             // pton = presentation to network
   printf("\nInvalid adress / Adress not supported \n");                       // Retorna -1 em erro e 0 se o ip não está no formato certo
   return -1;
 }
 printf("connecting\n");
 if(connect(sock, (struct sockaddr *)&serv_addr, sizeof(serv_addr)) < 0)       //CONECTANDO COM O SERVIDOR
 {
   printf("\nConnection failed \n");
   return -1;
 }
 return 0;
}
