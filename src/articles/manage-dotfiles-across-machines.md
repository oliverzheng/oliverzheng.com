---
title: Manage Dotfiles Across Machines and Platforms
date: 2015-12-31
layout: article.html
---

I have a few machines: personal laptop, work laptop, home linux server, and work
linux server. I do development on all of them, and use the same tools most of
the time. Syncing dotfiles should be easy, but my requirements include:

- Versioning. If I screw something up, I can always go back to an older version.
- Easy syncing & deployment. I should be able to spread my changes easily across
  machines, and update local dotfiles easily with some symlink.
- Slightly different configurations for different machines. My work
  laptop/server have tools that I want my bash prompt and Vim to integrate with.
  My personal & work laptops have Mac tools I want to alias and integrate with.
  There is a permutation of configurations.

A git repository controls versioning just the way I want it. Dropbox syncs, but
doesn't deploy/link the files to their locations in the home directory;
[Mackup][] syncs and deploys perfectly - it has an option to sync from a local
directory and symlink configuration files where you want them. The local
directory is a git repository that contains the dotfiles and is mirrored
remotely.

To allow for different configurations, my `.bash_profile` runs `hostname` and
exports some environment variables to indicate which machine/platform it is:

```
if hostname | grep -q .WORKDOMAIN.COM; then
  export ISWORKCOMPUTER=1
else
  export ISWORKCOMPUTER=0
fi
```

and `uname` to distinguish between Mac and Linux. It then sources
platform/machine specific bash configurations:

```
if [ "$(uname)" == "Darwin" ] && [ -f ~/.bash_profile.mac ]; then
  source ~/.bash_profile.mac
fi
```

`.bashrc` does the same thing, but checks the variables that were set in
`.bash_profile`:

```
if [ $ISWORKCOMPUTER == 1 ] && [ -f ~/.bashrc.work ]; then
  source ~/.bashrc.work
fi
```

Vim can also do the same thing:

```
let iswork=$ISWORK
if iswork == '1'
  if !empty(glob("~/.vimrc.work"))
    source ~/.vimrc.work
  endif
endif
```

  [Mackup]: https://github.com/lra/mackup
