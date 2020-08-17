#include <fstream>
#include <stdlib.h>
#include <time.h>
#include <stdio.h>

int main(int argc, char** argv)
{
    std::ofstream file;
    file.open("mediciones.txt");
    srand(time(NULL));
    for(int i = 0; i < 100; ++i)
    {
        int sensor = rand() % 10 + 1;
        int medicion = rand() % 100;
        file << "INSERT INTO DAM.Mediciones (fecha,valor,dispositivoId) VALUES \
(current_timestamp()," << medicion << "," << sensor <<");" << std::endl;
    }
    file.close();
    return 0;
}