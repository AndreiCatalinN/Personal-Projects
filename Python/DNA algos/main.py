# python -m pip install -U pip
# python -m pip install -U matplotlib
# Author: Andrei Negura
# Date: 15/01/2021
# Description:
# Program that reads DNA sequences from files,
# Calculates whether a chain is DNA or RNA,
# Calculates the percentage of nucleotides in each chain
# Displays the percentages using matplotlib
# Calculates the complementary chain and writes it to another file
import matplotlib.pyplot as plt


def main():
    files = ['chain1.txt', 'chain2.txt',  'chain3.txt',  'chain4.txt']
    chains = []
    i = 1
    # calculate percents
    for file in files:
        chain = read_file("input/"+file)
        chains.append(calculate_percent(chain))
        with open('output/complementary{}.txt'.format(i), 'w') as save:
            save.write(generate(chain))
        i += 1
    generate_graphs(chains)


def generate_graphs(chains):
    """
    Receives the structure of chains and generates the graphs

    :param chains:
    an array of nucleotide percentages for each chain
    EG: [[0.25, 0.24, 0.23, 0.0, 0.27]] Last 2 are uracil and thymine
    """

    nucleotides = ['A', 'C', 'G', 'U', 'T']
    # set graph
    plt.suptitle("Percent nucleotides")
    plt.xlabel("Nucleotides")
    plt.ylabel("Percent nucleotides")

    # create graphs
    for i in range(1, len(chains) + 1):
        print(chains[i - 1])
        plt.subplot(4, 1, i)
        plt.title('chain{}.txt'.format(i))
        plt.bar(nucleotides, chains[i - 1])
    plt.show()


def read_file(file_name):
    """
    Opens a file from input folder, reads it and clears the end lines from chain
    :param file_name: name of file
    :return: returns a DNA/RNA chain
    """
    with open(file_name, 'r') as file:
        chain = file.read()
        chain = chain.replace('\n', '')
    return chain


def contains_uracil(chain):
    """
    Checks if a chain is DNA or RNA
    :param chain: the chain in question
    :return: returns if it's RNA or not
    """
    if chain.count('T') > 0:
        print('DNA')
        return False
    elif chain.count('U') > 0:
        print('RNA')
        return True


def calculate_percent(chain):
    """
    Calculates the percentage of each nucleotide
    :param chain: the chain in question
    :return: an array with the percentages. <1
    """
    return [
        chain.count('A') / len(chain),
        chain.count('C') / len(chain),
        chain.count('G') / len(chain),
        chain.count('U') / len(chain),
        chain.count('T') / len(chain)
    ]


def generate(chain):
    """
    Generates the complementary chain
    :param chain: DNA/RNA chain
    :return: returns complementary chain
    """
    if contains_uracil(chain):
        complement = {'A': 'U', 'C': 'G', 'G': 'C', 'U': 'A'}
    else:
        complement = {'A': 'T', 'C': 'G', 'G': 'C', 'T': 'A'}

    reverse = ""
    for nucleotide in chain:
        nucleotide = complement[nucleotide]
        reverse += nucleotide

    return reverse


if __name__ == '__main__':
    main()
