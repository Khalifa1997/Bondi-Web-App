import { UserAccount } from "@/store/login/state";

export default {
  async Login(
    email: string,
    password: string
  ): Promise<UserAccount | undefined> {
    const tempAccounts: UserAccount[] = [
      {
        username: "admin",
        password: "password",
        name: "Admin",
        initials: "AD",
        initialsStyle: "text-purple-700",
        permissions: {
          CanOrderDevice: true,
          CanManageOrder: true
        }
      },
      {
        username: "customer",
        password: "password",
        name: "Customer",
        initials: "CM",
        initialsStyle: "text-blue-700",
        permissions: {
          CanOrderDevice: true,
          CanManageOrder: false
        }
      }
    ];
    const user: UserAccount | undefined = await new Promise(
      (res: (a: UserAccount | undefined) => unknown) => {
        const account = tempAccounts.find(acc => {
          return (
            acc.username.toLocaleLowerCase() === email.toLocaleLowerCase() &&
            acc.password === password
          );
        });
        res(account);
      }
    );

    return user;
  }
};
