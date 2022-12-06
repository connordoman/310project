import os, random, math

def process_file(filename):
    """Reads a file and returns a list of its lines."""
    with open(filename, 'r') as f:
        lines = []
        for line in f:
            line = line.strip()
            if line == "":
                continue
            if line[0] in "#ABCDEFGHIJKLMNOPQRSTUVWXYZ":
                lines.append(line)
            else:
                lines[-1] += " " + line

        return lines


def write_file_from_lines(name, lines):
    """Writes a file from a list of lines."""
    with open(name, "w") as f:
        for line in lines:
            f.write(line + "\n")


def create_ddl_1d(title, ddl, list):
    """Creates a DDL file."""
    with open(f"{title}.sql", "w") as f:
        f.write(f"-- {title}\n")
        i = 1
        for line in list:
            if line == "\n":
                continue
            line = line.strip()
            prepDDL = ddl.replace("?", str(i), 1)
            f.write(prepDDL.replace("?", line, 1) + "\n")
            i += 1


def random_price(min, max):
    """Returns a random price."""
    return round(random.uniform(min, max), 2)


def prepare_ddl_statement(ddl, values):
    """Prepares a DDL statement."""
    for value in values:
        ddl = ddl.replace("?", str(value), 1)
    return ddl


def create_equipment_ddl(title, names):
    """Creates a DDL file."""
    ddl = "INSERT INTO product (id, name, price, description, cid, permission) VALUES (?, '?', ?, '?', ?, ?);"
    with open(f"{title}.sql", "w") as f:
        f.write(f"-- {title}\n")
        i = 1
        current_category = 1
        highest_price = 0
        lowest_price = math.inf
        for name in names:
            name = name.strip()
            print(f"{i}: {name}")
            if name == "":
                continue
            if name[0] == "#":
                current_category = int(f"{name[1]}{name[2]}")
                # skip categories after 1
                # if current_category == 2:
                #     break
                continue


            equipmentDescription = ""
            nameSlug = name
            delims = [" designed for ", " for ", "(note", "(with", "(does", "(e.g.", "including", " - ", ":", ";"]
            delimLength = len(name)
            chosenDelim = ""
            for d in delims:
                splt = name.split(d)
                print(f"\td is \"{d}\"\n\tsplt is {splt}")
                if len(splt) > 1:
                    nameSlug = splt[0]
                    print(f"\t\tnameSlug is \"{nameSlug}\"")
                    if len(nameSlug) > 0 and len(nameSlug) < delimLength:
                        print(f"\t\tchosenDelim is \"{d}\"")
                        chosenDelim = d
                        delimLength = len(nameSlug)
                    else:
                        print(f"\t\t\"{d}\" is not sooner than \"{chosenDelim}\"")

            print(f"\n\tchosenDelim is \"{chosenDelim}\"\n")

            # finalize nameslug
            if chosenDelim:
                nameSlug = name.split(chosenDelim)[0].strip()

            if any(c.isalpha() for c in chosenDelim):
                # don't replace the delim
                equipmentDescription = name.replace(nameSlug, "").strip()
            else:
                # replace the delim
                equipmentDescription = name.replace(nameSlug + chosenDelim, "").strip()

            if equipmentDescription[:3] == "and":
                equipmentDescription = "with " + equipmentDescription[3:]

            nameSlug = nameSlug.strip()

            # random price
            price = random_price(math.e ** (5 + math.log(current_category / 2, 2)), math.e ** (9 + math.log(current_category, 2)))
            if price > highest_price:
                highest_price = price
            if price < lowest_price:
                lowest_price = price

            print(f"{nameSlug} - {equipmentDescription} - ${price:.2f}\n\n")

            maxPermission = len(process_file("medical_equipment_categories.txt"))
            permission = math.ceil(6 - ((current_category / maxPermission) * 5))
            if permission > 5:
                permission = 5

            ddl_statment = prepare_ddl_statement(ddl, [i, nameSlug, price, equipmentDescription, current_category, permission])
            ddl_statement = ddl_statment.replace(";", "") + ";\n"

            f.write(ddl_statement)
            i += 1

        print(f"Highest price is ${highest_price:.2f}")
        print(f"Lowest price is ${lowest_price:.2f}\n")


def create_category_ddl():
    # categories
    categoriesFileName = "medical_equipment_categories.txt"

    # Read the file
    lines = process_file(categoriesFileName)

    # Create the DDL
    ddl = "INSERT INTO category (id, name) VALUES (?, '?');"
    create_ddl_1d(lines, ddl, categoriesFileName.split(".")[0])


def create_product_ddl():
    # products
    productsFileName = "medical_equipment_products.txt"

    # Read the file
    lines = process_file(productsFileName)
    write_file_from_lines("clean_medical_equipment_products.txt", lines)

    # Create the DDL
    create_equipment_ddl(productsFileName.split(".")[0], lines)


if __name__ == "__main__":
    # create_category_ddl()
    create_product_ddl()